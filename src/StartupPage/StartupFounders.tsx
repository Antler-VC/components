import React, { useState } from 'react';

import SubSectionHeader from '../ContentHeader/SubSectionHeader';
import CardGrid from '../layouts/CardGrid';
import ProfileModal from '../DemoDay/ProfileModal';

import StartupFounderCard, {
  IStartupFounderCardProps,
} from './StartupFounderCard';

export interface IStartupFoundersProps {
  teamMembers: {
    docPath: string;
    snapshot: IStartupFounderCardProps['data'] & {
      linkedin?: string;
      twitter?: string;
      bio?: string;
      founderBio?: string;
    };
  }[];
  className?: string;
}

export default function StartupFounders({
  teamMembers,
  className,
}: IStartupFoundersProps) {
  const [modal, setModal] = useState(-1);

  if (!Array.isArray(teamMembers)) return null;

  return (
    <section className={className}>
      <SubSectionHeader text="Founders" headingLevel="h2" />

      <CardGrid>
        {teamMembers.map(({ docPath, snapshot }, i) => (
          <StartupFounderCard
            key={docPath}
            data={snapshot}
            onClick={() => setModal(i)}
          />
        ))}
      </CardGrid>

      <ProfileModal
        {...((modal > -1 ? teamMembers[modal].snapshot : {}) as any)}
        hasData={modal > -1}
        clearData={() => setModal(-1)}
        isSingle={teamMembers.length < 2}
        onPrev={() => setModal(i => (i === 0 ? teamMembers.length - 1 : i - 1))}
        onNext={() => setModal(i => (i + 1) % teamMembers.length)}
      />
    </section>
  );
}
