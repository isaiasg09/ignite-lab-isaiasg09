import { CaretRight, DiscordLogo, FileArrowDown, Image, Lightning } from "phosphor-react";

import '@vime/core/themes/default.css';
import { Player } from "./Player";
import { useGetLessonBySlugQuery } from "../graphql/generated";
import { LogoRocketseat } from "./LogoRocketseat";

interface VideoProps {
  lessonSlug: string;
}

export function Video(props: VideoProps) {
  const { data, loading } = useGetLessonBySlugQuery({
    variables: {
      slug: props.lessonSlug
    },
    fetchPolicy: 'no-cache'
  });
  

  if(!data ||!data.lesson) {
    return (
      <div className="flex-1">
        <h1>Carregando...</h1>
      </div>
    )
  }


  return (
    <div className="flex-1 flex flex-col min-h-screen">
      <Player videoId={data.lesson.videoId}/>

      <div className="p-6 max-w-[1100px] mx-auto h-full flex flex-col">
        <div className="flex items-start gap-16">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">
              {data.lesson.title}
            </h1>

            <p className="mt-4 text-gray-200 leading-relaxed">
              {data.lesson.description}
            </p>

            {data.lesson.teacher && (
              <div className="flex items-center gap-4 mt-6">
                <img 
                  className="h-16 w-16 rounded-full border-2 border-blue-500"
                  src={data.lesson.teacher.avatarURL}
                  alt="Professor Avatar" 
                />

                <div className="leading-relaxed">
                  <strong className="font-bold text-2xl block">{data.lesson.teacher.name}</strong>
                  <span className="text-gray-200 text-sm block">{data.lesson.teacher.bio}</span>
                </div>
              </div>
            )}
          </div>   

          <div className="flex flex-col gap-4">
            <a href="#" className="p-4 text-sm bg-green-500 flex items-center text-center rounded font-bold uppercase gap-2 justify-center hover:bg-green-700 transition-colors">
              <DiscordLogo size={24} />
              Comunidade do Discord
            </a>
            <a href="#" className="p-4 text-sm flex items-center text-center text-blue-500 rounded border border-blue-500 font-bold uppercase gap-2 justify-center hover:bg-blue-500 hover:text-gray-900 transition-colors duration-500">
              <Lightning size={24} />
              Acesse o Desafio
            </a>
          </div>     
        </div>
        
        <div className="gap-8 mt-20 grid grid-cols-2">
          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-green-700 h-full p-6 flex items-center">
              <FileArrowDown size={39}/>
            </div>

            <div className="py-6 leading-relaxed">
                <strong className="text-2xl">
                  Material Complementar
                </strong>
                <p className="text-sm text-gray-200 mt-2">
                  Acesse o material complementar para acelerar o seu desenvolvimento
                </p>
            </div>

            <div className="h-full p-6 flex items-center text-green-500">
              <CaretRight size={24}/>
            </div>
          </a>

          <a href="#" className="bg-gray-700 rounded overflow-hidden flex items-stretch gap-6 hover:bg-gray-600 transition-colors">
            <div className="bg-blue-700 h-full p-6 flex items-center">
              <Image size={39}/>
            </div>

            <div className="py-6 leading-relaxed">
                <strong className="text-2xl">
                  Wallpapers Exclusivos
                </strong>
                <p className="text-sm text-gray-200 mt-2">
                  Baixe wallpapers exclusivos do Ignite Lab e personalize a sua máquina
                </p>
            </div>

            <div className="h-full p-6 flex items-center text-blue-500">
              <CaretRight size={24}/>
            </div>
          </a>
        </div>
        <footer className="h-14 mt-auto flex flex-row justify-between items-center text-gray-300 border-t border-gray-500 pt-5">
          <div className="flex items-center gap-5">
            <LogoRocketseat />
            <span>
              Rocketseat - todos os direitos reservados
            </span>
          </div>

          <span>
            Políticas de Privacidade
          </span>
        </footer>
      </div>

    </div>
  )
}
