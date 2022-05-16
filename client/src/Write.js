import axios from "axios";
import {useRef, useState, useCallback} from "react";

const Write = () => {
    const [title, setTitle] = useState("");
    const textRef = useRef(null);
    const [imageName, setImageName] = useState();
    const [category, setCategory] = useState("#");
    const categoryRef = useRef(null);
    const changeTitle = useCallback((e) => {
        setTitle(e.target.value);
    }, []);

    const changeFont = (e) => {
        if(textRef.current){
            const size = e.target.dataset.size;
            
            document.execCommand("fontSize", false, size);
            textRef.current.focus();
        }
        
    }

    const handleChangeImage = useCallback(async (e) => {
        e.preventDefault();
        if(e.target.files){
            const uploadFile = e.target.files[0];
            const fileName = e.target.files[0].name;
            setImageName(fileName)
            const formData = new FormData();
            formData.append('files', uploadFile);
            console.log(formData)
            await axios({
                method: 'post',
                url: '/api/files/images',
                data: formData,
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            }).then((response) => {
                console.log(response)
                if(textRef.current){
                    textRef.current.focus();
                    document.execCommand('insertHTML', false, `<img src="${process.env.PUBLIC_URL + `/images/${response.data}`}" title="image" />`)
                }
            })
            
        }
    },[]);

    const changeCategory = useCallback((e) => {

        setCategory(e.target.value);
        console.log(e.target.value)
        console.log(category)
    }, []);

    const handleBeforeInput = useCallback((e) => {
        document.execCommand('FormatBlock', false, '<pre>')
    }, []);

    const changeStyle = (e) => {
        if(textRef.current){
            const style = e.target.dataset.style;
            document.execCommand(style);
            textRef.current.focus();
        }
    }

    const handleSubmit = useCallback( async () => {
        console.log(category)
        if(category === "#"){
            alert("카테고리를 설정해주세요");
            categoryRef.current.focus();
        }else{
            const content = document.getElementById("editor").innerHTML;
            await axios.post('api/write', {
                title: title,
                content: content,
                category: category
            }).then((response) => {

            });
        }
    }, [category])

    return (
        <>
  <div className="write-page">     
  <div className="write-title">
      <input style={{color: "black"}} className="back-color" type="text" id="title" placeholder="제목을 입력하세요" value={title} onChange={changeTitle}/>
  </div>
  <hr />
  <div className="write-category">
    <select className="back-color symbol-color" ref={categoryRef} name="category"value={category} onChange={changeCategory}>
      <option value="#"  >카테고리</option>
      <option value="meetingnote">회의록</option>
      <option value="project">프로젝트</option>
      <option value="web">Web</option>
      <option value="mobile">Mobile</option>
      <option value="dataanalysis">DataAnalysis</option>
      <option value="ai">AI</option>
    </select>
  </div> 
  <div className="write-btn">
      <button className="back-color" id="btnBigFont"  onClick={changeFont} data-size={"7"}>대</button>
      <button className="back-color" id="btnMiddleFont"  onClick={changeFont} data-size={"5"}>중</button>
      <button className="back-color" id="btnSmallFont"  onClick={changeFont} data-size={"3"}>소</button>

      <button className="back-color" id="btnBold" data-style={"bold"} onClick={changeStyle}><b>B</b></button>
      <button className="back-color" id="btnItalic" data-style={"italic"} onClick={changeStyle}><span style={{fontStyle: "italic"}}>I</span></button>
      <button className="back-color" id="btnStrike" data-style={"strikeThrough"} onClick={changeStyle}>T</button>

      <button className="back-color" >"</button>
      <button className="back-color symbol-color">링크</button>
      <button  className="back-color" id="btnImage"><i style={{fontSize: "20px"}} className="far fa-image"></i></button>
      <input  className="image-selector" id="imgSelector" type="file" accept="image/*" onChange={handleChangeImage} />

    </div>

  <div contentEditable={true} ref={textRef } className="write-contents" data-text="텍스트를 입력하세요." id="editor"  onBeforeInput={handleBeforeInput}>

  </div>

  <div className="last-button">
    <button >임시저장</button>
    <button className="complete-button" onClick={handleSubmit}>저장하기</button>
  </div>

  </div>
  
        </>
    );
};

export default Write;