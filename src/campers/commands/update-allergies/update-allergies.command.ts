export class UpdateAllergiesCommand {
  constructor(
    public readonly camperId: string,
    public readonly allergies: string[],
  ) {}
}
