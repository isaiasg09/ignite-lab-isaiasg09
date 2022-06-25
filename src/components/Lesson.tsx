import { CheckCircle, Lock } from 'phosphor-react';
import { isPast, format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link, useParams } from 'react-router-dom';
import classNames from 'classnames';

interface LessonProps {
  title: string;
  slug: string;
  availableAt: Date;
  type: 'live' | 'class';
}

export function Lesson(props: LessonProps) {
  const { slug } = useParams<{ slug: string }>();

  const isLessonAvailable = isPast(props.availableAt); // is past the current date (Is lesson available)
  const availableDateFormatted = format(props.availableAt, "EEEE '•' d 'de' MMMM '•' k'h'mm", {
    locale: ptBR,
  });

  const isActiveLesson = slug === props.slug;
  

  return (
    <div>
      <span className="text-gray-300 cursor-text">
        {availableDateFormatted}
      </span>

      <div className="cursor-not-allowed">
        <Link 
          to={`/event/lesson/${props.slug}`} 
          className={classNames({
            "pointer-events-none": !isLessonAvailable
          })}
        >

          <div 
            className={classNames('rounded border border-gray-500 p-4 mt-2 transition-all', {
              'hover:border-green-500 hover:transform hover:scale-105': isLessonAvailable && !isActiveLesson,
              'bg-gray-500': !isLessonAvailable ,
              'bg-green-500 active-lesson': isActiveLesson
            })}
          >
            <header className="flex items-center justify-between allowed">
              {isLessonAvailable ? (
                <span 
                  className={classNames('text-sm font-medium flex items-center gap-2', {
                    'text-white': isActiveLesson,
                    'text-blue-500': !isActiveLesson
                  })}
                >
                  <CheckCircle size={20}/>
                  Conteúdo Liberado
                </span>
              ) : (
                <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                  <Lock size={20}/>
                  Em breve
                </span>
              )}

              
              <span 
                className={classNames('text-xs rounded px-2 py-[0.125rem] border  font-bold ', {
                  'text-green-300': props.type==='live' && !isActiveLesson,
                  'text-white': props.type==='class' || isActiveLesson,
                  'border-white': isActiveLesson,
                  'border-green-300': !isActiveLesson,
                })}
              >
                {props.type === 'live' ? 'AO VIVO' : 'AULA PRÁTICA'}
              </span>
            </header>
            
            <strong 
              className={classNames('mt-5 block', {
                'text-white': isActiveLesson,
                'text-gray-200': !isActiveLesson
              })}
            >
              {props.title}
            </strong>
          </div>
        </Link>
      </div>
    </div>
  )
}
