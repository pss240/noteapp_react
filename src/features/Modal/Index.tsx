import React, { useRef, useState } from 'react'
import './Modal.css'
import { selectNav } from '../nav/navSlice';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import AddTagModal from './addTagModal';
import {addAsync,addMemo, selectMemo} from '../memo/memoSlice';
type Props = {
    setModalOpen:(bool:boolean)=>void;
  }
interface Memo {
value: {
    id:string;
    title:string;
    contents:string;
    tags:string[];
    pin:boolean;
    backgroundColor:string;
    priority:string;
};
}

const InputModal = ({setModalOpen}:Props) => {
    const [viewColor, setViewColor] = useState(false)
    const [viewPriority, setViewPriority] = useState(false)
    const [backgroundColor, setBackgroundColor] = useState('White')
    const [priority, setPriority] = useState('Low')
    const [addedTags, setAddedTags] = useState(['Notes'])
    const [tagModalOpen, setTagModalOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [contents, setContents] = useState('')
    const nav = useAppSelector(selectNav);
    const memos = useAppSelector(selectMemo)
    const dispatch = useAppDispatch();
    const handleTagModal = (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        setTagModalOpen(true);
        console.log(tagModalOpen);
    }
    const handleAddedTags = (tag:string) =>{
        setAddedTags(addedTags.filter((t)=>t!=tag))
    }
    const handleChangeTitle = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setTitle(e.target.value);
    }
    const handleChangeContent = (e:React.ChangeEvent<HTMLInputElement>) =>{
        setContents(e.target.value);
    }
    const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) =>{
        e.preventDefault();
        const today = new Date();
        dispatch(addMemo({value:{
                id: today.toLocaleString(),
                title:title,
                contents:contents,
                tags:addedTags,
                pin:false,
                backgroundColor:backgroundColor,
                priority:priority
            }})
        )
        setModalOpen(false)
    }
    
  return (
    <div>
        {
        tagModalOpen && (
          <AddTagModal tags={nav} addedTags={addedTags} setAddedTags={setAddedTags} setTagModalOpen={setTagModalOpen} editflag={false}/>
          )
        }
    <div className='presentation' role='presentation'>
        <div className='wrapper-modal'>
            <div className='modal'>
                <span onClick={()=>setModalOpen(false)} className='modal-close'>x</span>
                <div className='div_modalTitle'><span>노트 생성하기</span></div>
                <form className='form'>
                    <div className='div_title'>
                    <input onChange={handleChangeTitle} type='text' className='input_title'/>
                    </div>
                    <div className='div_textarea'>
                    {backgroundColor=='White'?
                    <input onChange={handleChangeContent} type='textarea' className='input_textarea_white'/>
                    :backgroundColor=="Red"?
                    <input onChange={handleChangeContent} type='textarea' className='input_textarea_red'/>
                    :backgroundColor=="Green"?
                    <input onChange={handleChangeContent} type='textarea' className='input_textarea_green'/>
                    :backgroundColor=="Blue"?
                    <input onChange={handleChangeContent} type='textarea' className='input_textarea_blue'/>
                    :<></>}
                    </div>
                    <div className='div_addedTags'>
                        {addedTags.map((tag,index)=><div key={index} className='div_tag2'>{tag}<button className='btn_tag' onClick={()=>handleAddedTags(tag)}>x</button></div>)}
                    </div>
                    <div className='div_memoDetail'>
                        <button onClick={(e)=>handleTagModal(e)}>Add Tag</button> 
                        <div>

                        <ul onClick={()=>setViewColor(!viewColor)} className ='ul_backgroundColor'>
                        배경색:{backgroundColor} {viewColor?'⌃' : '⌄'}
                            {viewColor && <><li onClick={()=>setBackgroundColor('White')}>White</li><li onClick={()=>setBackgroundColor('Red')}>Red</li><li onClick={()=>setBackgroundColor('Green')}>Green</li><li onClick={()=>setBackgroundColor('Blue')}>Blue</li></>}
                        </ul>
                        </div>
                        <div>

                        <ul onClick={()=>setViewPriority(!viewPriority)} className ='ul_backgroundColor'>
                        우선순위:{priority} {viewPriority?'⌃' : '⌄'}
                            {viewPriority && <><li onClick={()=>setPriority('Low')}>Low</li><li onClick={()=>setPriority('High')}>High</li></>}
                        </ul>
                        </div>
                    </div>
                    <div className='div_submit'>
                    <button onClick={handleSubmit} className='button_submit'>+생성하기</button>
                    </div>
                </form>
                
            </div>

        </div>
    </div>

    </div>
  )
}

export default InputModal