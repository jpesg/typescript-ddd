import { type RabbitMQConnection } from '../../../../../src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq.connection'
import { RabbitMQEventBus } from '../../../../../src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq.event.bus'
import { UsersCounterIncrementedDomainEventMother } from '../../../user/users-counter/domain/users.counter.incremented.domain.event.mother'
import MongoEnvironmentArranger from '../mongo/mongo.environment.arranger'
import { RabbitMQQueueFormatter } from '../../../../../src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq.queue.formatter'
import { RabbitMQMongoClientMother } from './__mother__/rabbitmq.mongo.client.mother'
import { RabbitMQConnectionMother } from './__mother__/rabbitmq.connection.mother'
import { DomainEventFailoverPublisherMother } from './__mother__/domain.event.failover.publisher.mother'
import { DomainEventSubscriberDummy } from './__mocks__/domain.event.subscriber.dummy'
import { RabbitMQConfigurer } from '../../../../../src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq.configurer'
import { type DomainEventFailoverPublisher } from '../../../../../src/contexts/shared/infrastructure/event-bus/domain-event-failover-publisher/domain.event.failover.publisher'
import { DomainEventSubscribers } from '../../../../../src/contexts/shared/infrastructure/event-bus/domain.event.subscribers'
import { DomainEventDummyMother } from './__mocks__/domain.event.dummy'
import { type DomainEvent } from '../../../../../src/contexts/shared/domain/domain.event'
import { DomainEventDeserializer } from '../../../../../src/contexts/shared/infrastructure/event-bus/domain.event.deserializer'
import { RabbitMQConsumer } from '../../../../../src/contexts/shared/infrastructure/event-bus/rabbitmq/rabbitmq.consumer'

/* describe('RabbitMQEventBus test', () => {
  const config = {
    connectionSettings: {
      username: 'guest',
      password: 'guest',
      vhost: '/',
      connection: {
        secure: false,
        hostname: 'localhost',
        port: 5672,
      },
    },
    exchangeSettings: {
      name: '',
    },
  }

  let connection: RabbitMQConnection

  beforeAll(async () => {
    connection = new RabbitMQConnection(config)
    await connection.connect()
  })

  afterAll(async () => {
    await connection.close()
  })

  it('should publish events to RabbitMQ', async () => {
    const eventBus = new RabbitMQEventBus({ connection })
    await eventBus.publish([UsersCounterIncrementedDomainEventMother.create()])
  })
}) */
describe('RabbitMQEventBus test', () => {
  const exchange = 'test_domain_events'
  let arranger: MongoEnvironmentArranger
  const queueNameFormatter = new RabbitMQQueueFormatter('mooc')

  beforeAll(async () => {
    arranger = new MongoEnvironmentArranger(RabbitMQMongoClientMother.create())
  })

  beforeEach(async () => {
    await arranger.arranger()
  })

  afterAll(async () => {
    await arranger.close()
  })

  describe('unit', () => {
    it('should use the failover publisher if publish to RabbitMQ fails', async () => {
      const connection = RabbitMQConnectionMother.failOnPublish()
      const failoverPublisher = DomainEventFailoverPublisherMother.failOverDouble()
      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange,
        queueNameFormatter,
        maxRetries: 2,
      })
      const event = UsersCounterIncrementedDomainEventMother.create()

      await eventBus.publish([event])

      failoverPublisher.assertEventHasBeenPublished(event)
    })
  })

  describe('integration', () => {
    let connection: RabbitMQConnection
    let dummySubscriber: DomainEventSubscriberDummy
    let configurer: RabbitMQConfigurer
    let failoverPublisher: DomainEventFailoverPublisher
    let subscribers: DomainEventSubscribers

    beforeAll(async () => {
      connection = await RabbitMQConnectionMother.create()
      failoverPublisher = DomainEventFailoverPublisherMother.create()

      configurer = new RabbitMQConfigurer(connection, queueNameFormatter, 50)
    })

    beforeEach(async () => {
      await arranger.arranger()
      dummySubscriber = new DomainEventSubscriberDummy()
      subscribers = new DomainEventSubscribers([dummySubscriber])
    })

    afterAll(async () => {
      await cleanEnvironment()
      await connection.close()
    })

    it('should consume the events published to RabbitMQ', async () => {
      await configurer.configure({ exchange, subscribers: [dummySubscriber] })
      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange,
        queueNameFormatter,
        maxRetries: 3,
      })
      await eventBus.addSubscribers(subscribers)
      const event = DomainEventDummyMother.random()

      await eventBus.publish([event])

      await dummySubscriber.assertConsumedEvents([event])
    })

    it('should retry failed domain events', async () => {
      dummySubscriber = DomainEventSubscriberDummy.failsFirstTime()
      subscribers = new DomainEventSubscribers([dummySubscriber])
      await configurer.configure({
        exchange,
        subscribers: [dummySubscriber],
      })

      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange,
        queueNameFormatter,
        maxRetries: 3,
      })
      await eventBus.addSubscribers(subscribers)
      const event = DomainEventDummyMother.random()
      await eventBus.publish([event])
      await dummySubscriber.assertConsumedEvents([event])
    })

    it('Should send envents to dead letter after retry failed', async () => {
      dummySubscriber = DomainEventSubscriberDummy.alwaysFails()
      subscribers = new DomainEventSubscribers([dummySubscriber])
      await configurer.configure({ exchange, subscribers: [dummySubscriber] })
      const eventBus = new RabbitMQEventBus({
        failoverPublisher,
        connection,
        exchange,
        queueNameFormatter,
        maxRetries: 3,
      })
      await eventBus.addSubscribers(subscribers)
      const event = DomainEventDummyMother.random()

      await eventBus.publish([event])

      await dummySubscriber.assertConsumedEvents([])
      await assertDeadLetter([event])
    })

    async function cleanEnvironment() {
      await connection.deleteQueue(queueNameFormatter.format(dummySubscriber))
      await connection.deleteQueue(queueNameFormatter.formatRetry(dummySubscriber))
      await connection.deleteQueue(queueNameFormatter.formatDeadLetter(dummySubscriber))
    }

    async function assertDeadLetter(events: DomainEvent[]) {
      const deadLetterQueue = queueNameFormatter.formatDeadLetter(dummySubscriber)
      const deadLetterSubscriber = new DomainEventSubscriberDummy()
      const deadLetterSubscribers = new DomainEventSubscribers([dummySubscriber])
      const deserializer = DomainEventDeserializer.configure(deadLetterSubscribers)
      const consumer = new RabbitMQConsumer({
        subscriber: deadLetterSubscriber,
        deserializer,
        connection,
        maxRetries: 3,
        queueName: deadLetterQueue,
        exchange,
      })
      await connection.consume(deadLetterQueue, consumer.onMessage.bind(consumer))

      await deadLetterSubscriber.assertConsumedEvents(events)
    }
  })
})
