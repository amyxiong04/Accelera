import { EventParticipationForm } from '@/components/event-participation/event-participation-form';

export default function EventParticipation() {
  return (
    <div className="flex min-w-[700px] flex-col gap-4 p-6 pb-12">
      <div className="flex justify-center gap-2 md:justify-start"></div>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-full">
          <EventParticipationForm />
        </div>
      </div>
    </div>
  );
}
