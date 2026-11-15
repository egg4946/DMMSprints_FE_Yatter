import { Timeline } from "@/components/Timeline";
import { YweetCard } from "@/components/YweetCard";

type Yweet = {
  id: number;
  content: string;
  user: {
    username: string;
    avatar: string;
  };
};
type TimelineResponse = Yweet[];
/**
 * タイムライン（ホーム）
 * docs/02_timeline.md を見ながら、ここで API から Yweet を取得して表示する
 */
export default async function Home() {

  const response = await fetch(process.env.NEXT_PUBLIC_API_BASE_URL + "/v1/timelines/public");
  const yweets = (await response.json()) as TimelineResponse;


  console.log(yweets);

  return <Timeline>{
    yweets.map((yweet) =>(
      <YweetCard
        key={yweet.id}
        content={yweet.content}
        username={yweet.user.username}
        avatarUrl={yweet.user.avatar}
      />
    ))}</Timeline>;
  }
