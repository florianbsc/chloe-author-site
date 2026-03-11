
import Button from "@/app/src/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { House, ArrowBigRightDash, PartyPopper, Triangle, Search, Compass, HandFist, Rose, VolumeOff } from 'lucide-react';


export default function Book() {
    return (
<div>


  <section className="space-y-4 max-w-xl bg-green-50">
    <h4>Romans</h4>
      <h1 className="text-3xl font-bold">Mes romans</h1>
      <p></p>
      <Link href="/romans">
        <Button variant="primary">Découvrir</Button>
      </Link>
      <Link href="https://www.amazon.fr">
        <Button variant="third">Amazon</Button>
      </Link>
    </section>
    <section>
      <div>
        <h5>Catalogue</h5>
        <h1>Tous mes romans en un seul endroit</h1>
        <p>Chaque roman que j&apos;écrit porte en lui une part de vértité, une exploration de l&aop;âme humaine face aux défis qui la façconnent. Retrouvez ici l&aop;intégralité de mes oeuvres, classées par genre pour vous guider dans votre découvrete.</p>
        </div>
        <div>
          <House></House>
        <h5>Les secrets de Clara</h5>
        <p>Un thriller sombre où les menssonges s&aop;accumulent et où chaque secret cache une blessure plus profonde.</p>
      </div>
      <div>
        <ArrowBigRightDash></ArrowBigRightDash>
        <h5>Mon éternel combat</h5>
        <p>Mon autobiographie, écrit brut et sincere de ma vie, des mes luttes et des mes vitroires quotidiennes.</p>
      </div>
      <div>
        <Compass></Compass>
        <h5>Nos blessures sous la peau</h5>
        <p>Une romance qui ecplore comment l&apos;amour nît et s&apo;épanouitentre deux âmes marquées par la vie.</p>
      </div>
      <div>
        <VolumeOff></VolumeOff>
        <h5>La loge des silences</h5>
        <p>Un thriller captivant où le silence devient complice et où la verité doit être arrachée à l&aops;obscurité.</p>
        {/* <Link>
          <Button variant="third">En savoir plus</Button>
        </Link>
        <Link>
        <Button></Button>
        </Link> */}
      </div>
    </section>
</div>

  );
}