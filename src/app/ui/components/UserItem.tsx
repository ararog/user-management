
import React, { ReactNode } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import Image from 'next/image';

type UserItemProps = {
  onDeleteClick:  React.MouseEventHandler<SVGSVGElement>
  onUpdateClick:  React.MouseEventHandler<SVGSVGElement>
  deleting: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actionStyle: any
  updateIcon: IconDefinition
  deleteIcon: IconDefinition
  children: ReactNode
}

const LoadingSpinner = () => <Image src="/spinner.png" alt='' width={20} height={20}/>

export default function UserItem(props: UserItemProps) {
  return (
    <div style={{display: 'flex', flexDirection: 'row', margin: '1rem'}}>
      {props.children}
      <div className={props.actionStyle}>
        {props.deleting ? <LoadingSpinner /> :
          <FontAwesomeIcon  onClick={props.onUpdateClick} icon={props.updateIcon} color='white' />
        }
      </div>
      <div className={props.actionStyle}>
        <FontAwesomeIcon className={props.actionStyle} onClick={props.onDeleteClick} icon={props.deleteIcon} color='white' />
      </div>
    </div>
  )
}