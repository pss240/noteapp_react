import React from 'react'
import styles from "./Memo.module.css"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { changePin, selectMemo } from './memoSlice'
import LittleMemo from './LittleMemo'
const MemoContainer = ({selectedTag,flag}) => {
  const memos = useAppSelector(selectMemo)
  const dispatch = useAppDispatch()
  const handlePin = (id) =>{
    dispatch(changePin(id))
  }
    if (memos.filter((memo)=>{return memo.value.tags.includes(selectedTag)}).length==0){
    return(
      <div className='div_span'>
        <span>노트가 없습니다.</span>
      </div>
    )
  }
  else if(flag){
    return(
    <div className={styles.div_Notes}>
      <span className={styles.span_MemoContainerSortPin}>Pinned Notes({memos.filter((memo)=>{return memo.value.pin==true}).length})</span>
      <div className={styles.div_Note}>
          {memos.filter((m)=>{return m.value.pin==true}).map((memo)=>{
            return <LittleMemo memo={memo} handlePin = {handlePin}></LittleMemo>})}
      </div>
      <span className={styles.span_MemoContainerSortPin}>All Notes({memos.filter((memo)=>{return memo.value.pin==false}).length})</span> 
      <div className={styles.div_Note}>
      {memos.filter((m)=>{return m.value.pin==false}).map((memo)=>{
            return <LittleMemo memo={memo} handlePin = {handlePin}></LittleMemo>})}
      </div>
    </div>
    )}else{
      console.log(memos)
      return(
        <div className={styles.div_Notes}>
        <div className={styles.div_Note}>
          {memos.filter((m)=>{return m.value.tags.includes(selectedTag)})
          .map((memo)=>{
            return <LittleMemo memo={memo} handlePin = {handlePin}></LittleMemo>})}
        </div>
        </div>
    )}
}

export default MemoContainer