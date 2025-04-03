import { GroupCapitalForm } from '@/components/investors/group-capital';
import { GroupInvestorForm } from '@/components/investors/group-investor-form';

export default function Investors() {
  return (
    <>
      <div className="flex min-w-[600px] flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-full">
            <GroupCapitalForm />
          </div>
        </div>
      </div>
      <div className="flex min-w-[600px] flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-full">
            <GroupInvestorForm />
          </div>
        </div>
      </div>
    </>
  );
}
