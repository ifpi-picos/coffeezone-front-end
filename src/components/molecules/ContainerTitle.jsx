import Title from '../atoms/Title';
import Subtitle from '../atoms/Subtitle';

export default function ContainerTitle({title, subtitle}){
  return(
    <div className='flex flex-col items-center'>
      <Title styles=''>{title}</Title>
      {subtitle ? <Subtitle styles=''>{subtitle}</Subtitle> : null}
    </div>
  )
}