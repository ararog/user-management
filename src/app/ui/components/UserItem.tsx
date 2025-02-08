
import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';

type UserItemProps = {
  onDeleteClick:  React.MouseEventHandler<SVGSVGElement>
  onUpdateClick:  React.MouseEventHandler<SVGSVGElement>
  deleting: boolean
  updateIcon: IconDefinition
  deleteIcon: IconDefinition
  children: ReactNode
}

const LoadingSpinner = () => <Image src="/spinner.png" alt='' width={20} height={20}/>

export default function UserItem(props: UserItemProps) {
  return (
    <div className='flex flex-row'>
      {props.children}
      <div className="list-none ml-1.5 mr-2 bg-yellow-400 cursor-pointer">
        {props.deleting ? <LoadingSpinner /> :
          <FontAwesomeIcon  onClick={props.onUpdateClick} icon={props.updateIcon} color='white' />
        }
      </div>
      <div className="list-none ml-1.5 mr-2 bg-yellow-400 cursor-pointer">
        <FontAwesomeIcon className="" onClick={props.onDeleteClick} icon={props.deleteIcon} color='white' />
      </div>
    </div>
  )
}