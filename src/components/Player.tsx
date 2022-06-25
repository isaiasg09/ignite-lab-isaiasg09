import { DefaultUi, Player as VimePlayer, Youtube } from "@vime/react";

interface PlayerProps {
  videoId: string;
}

export function Player(props: PlayerProps) {
  return (
    <div className="bg-black flex justify-center">
        <div className="h-full w-full max-w-[1100px] h-max-[60vh] aspect-video">
          <VimePlayer>
            <Youtube videoId={props.videoId}/>
            <DefaultUi />
          </VimePlayer>
        </div>
      </div>
  )
}
