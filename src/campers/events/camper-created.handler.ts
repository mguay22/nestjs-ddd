import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { CamperCreatedEvent } from './camper-created.event';

@EventsHandler(CamperCreatedEvent)
export class CamperCreatedHandler implements IEventHandler<CamperCreatedEvent> {
  async handle({ camperId }: CamperCreatedEvent): Promise<void> {
    console.log('Camper Created:', camperId);
  }
}
