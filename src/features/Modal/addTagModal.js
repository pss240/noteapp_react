import React, { useRef, useState } from 'react'
import './addTagModal.css'
import useOnClickOutside from './useOnClickOutside';
import { add, del, selectNav } from '../nav/navSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
const AddTagModal = ({tags,addedTags,setAddedTags,setTagModalOpen,editflag}) => {
    const ref = useRef();
    const nav = useAppSelector(selectNav);
    const [addTag, setAddTag] = useState('')
    const dispatch = useAppDispatch()
    const handleAddedTags = (tag,flag) =>{
        if(flag){
            setAddedTags([...addedTags,tag]);
        }else{
            setAddedTags(addedTags.filter((addedTag) => tag!=addedTag));
        }
    }
    const handleMinusTags = (tag) =>{
        dispatch(del(tag))
    }
    const handleChangeAddTag = (e) =>{
        setAddTag(e.target.value)
    }
    const handleAddTag = (e) =>{
        e.preventDefault()
        dispatch(add(addTag))
        setAddTag("")
    }
    
    
  return (
    <div className='presentation2' role='presentation'>
        <div className='wrapper-modal2'>
            {
                editflag ? 
                <div className='modal2' ref={ref}>
                <span onClick={()=>setTagModalOpen(false)} className='modal-close2'>x</span>
                <div className='div_addTagsTitle'><span>Edit Tags</span></div>
                <div>
                <input type='text' value={addTag} onChange={handleChangeAddTag}></input>
                <button onClick={handleAddTag}>+</button>
                </div>
                <div className='div_tag_container'>
                {nav.map((tag,index)=><div key={index} className='div_tag'><span className='span_tag'>{tag}</span><button className='btn_handleAddedTags' onClick={()=>handleMinusTags(tag)}>-</button></div>)}
                </div>
            </div>
            :
            <div className='modal2' ref={ref}>
                <span onClick={()=>setTagModalOpen(false)} className='modal-close2'>x</span>
                <div className='div_addTagsTitle'><span>Add Tags</span></div>
                <div className='div_tag_container'>
                {tags.filter((tag)=>addedTags.includes(tag)).map((tag,index)=><div key={index} className='div_tag'><span className='span_tag'>{tag}</span><button className='btn_handleAddedTags' onClick={()=>handleAddedTags(tag,false)}>-</button></div>)}
                {tags.filter((tag)=>!addedTags.includes(tag)).map((tag,index)=><div key={index} className='div_tag'><span className='span_tag'>{tag}</span><button className='btn_handleAddedTags' onClick={()=>handleAddedTags(tag,true)}>+</button></div>)}     
                </div>
                
            </div>
            }
        </div>
    </div>
  )
}

export default AddTagModal