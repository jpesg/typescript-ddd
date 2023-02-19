export class User {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  constructor(private uuid: string, private name: string, private password: string) {}
}
