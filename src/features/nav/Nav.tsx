import React, { useState } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  add,del,selectNav
} from './navSlice';
import { selectselectedTag ,change} from './selectedTagSlice';
import styles from './Nav.module.css';
import AddTagModal from '../Modal/addTagModal';
import { MdOutlineEventNote } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaArchive } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



export function Nav() {
  const tags = useAppSelector(selectNav);
  const selectedTag = useAppSelector(selectselectedTag);
  const [tagModalOpen, setTagModalOpen] = useState(false)
  const dispatch = useAppDispatch();
  const handleTagModal = (e:React.MouseEvent<HTMLDivElement>) =>{
    e.preventDefault();
    setTagModalOpen(true);
    console.log(tagModalOpen);
}

  return (
    <div>

    {
      tagModalOpen && (
        <AddTagModal tags={[]} addedTags={[]} setAddedTags={{}} setTagModalOpen={setTagModalOpen} editflag={true}/>
        )
      }
    <div>
      <div className={styles.div_main_nav}>
        <p className={styles.nav_logo}>Keep</p>
        {
          tags.map((tag,index) =>
          <div key={index} className={styles.div_tag}
          onClick={()=>dispatch(change(tag))}>
          <MdOutlineEventNote />
          <p>{tag}</p>
        </div>)
        }
        <div className={styles.div_tag} onClick={handleTagModal}>
        <MdEdit />
          <p>Edit Notes</p>
        </div>
        <div className={styles.div_tag}
        onClick={()=>dispatch(change('Archive'))}>
          <FaArchive />
          <p>Archive</p>
        </div>
        <div className={styles.div_tag}
        onClick={()=>dispatch(change('Tresh'))}>
          <MdDelete />
          <p>Tresh</p>
        </div>
      </div>
      <div className={styles.div_sub_nav}>
        <p className={styles.sub_tag}>{selectedTag}</p>
        <button className={styles.sub_nav_button}>
          +
        </button>
      </div>
    </div>

    </div>
  );
}
