import React, { useState,useEffect } from 'react';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  addMemo,selectMemo
} from './memoSlice';
import styles from './Memo.module.css';
import { selectselectedTag } from '../nav/selectedTagSlice';
import type {Memo,MemoState} from '../memo/memoSlice'
import MemoContainer from './MemoContainer';
import InputModal from '../Modal/Index';

export function Memo() {
  const memos = useAppSelector(selectMemo);
  const selectedTag = useAppSelector(selectselectedTag);
  
  const dispatch = useAppDispatch();
  const [modalOpen, setModalOpen] = useState(false)
  const handleMemoModal = () =>{
    setModalOpen(true);
    console.log(modalOpen);
  }

  const handleSort = () =>{
    console.log(memos);
  }

  useEffect(() => {
    console.log(memos)
  }, [])
  

  return (
    <div className={styles.modal_wrapper}>
{
        modalOpen && (
          <InputModal setModalOpen={setModalOpen}/>
          )
        }
    <div className={styles.container}>
      {!(selectedTag=='Notes') ? 
        <div className={styles.div_content}>
        <MemoContainer selectedTag = {selectedTag} flag={false}/>
        </div>
        :
        <div className={styles.div_content}>
        <input className={styles.input} placeholder='노트의 제목을 입력해주세요.' onClick={handleMemoModal}></input>
        <button onClick={handleSort}className={styles.button_sort}>정렬</button>
        <MemoContainer selectedTag = {selectedTag} flag={true}/>
      </div>
      
    }
    </div>
    </div>
  );
}
