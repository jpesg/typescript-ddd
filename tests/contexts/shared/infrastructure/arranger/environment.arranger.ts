export abstract class EnvironmentArranger {
  public abstract arranger(): Promise<void>
  public abstract close(): Promise<void>
}
