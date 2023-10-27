/* eslint-disable react/prop-types */
import { useState } from "react";

const Meme = ({ meme, setMeme }) => {
  
    const [form, setForm] = useState({
        template_id: meme.id,
        username: "RituGupta",
        password: "Ritu@123",
        boxes: [],

    });

    const generatememe = () => {
        let url = `https://api.imgflip.com/caption_image?template_id=${form.template_id}&username=${form.username}&password=${form.password}`;
        form.boxes.map((box, index) => {
            return (url += (`&boxes[${index}][text]=${box.text}`));
        });
        console.log(url)
        fetch(url).then((res) => res.json())
            .then((data) => {
                if (data.success === true) {
                    setMeme({ ...meme, url: data.data.url })

                } else {
                    alert("Enter Some Text");
                }

            })
    }
    function save() {
        var xhr = new XMLHttpRequest();
        var url = meme.url;
        xhr.open("GET", url, true);
        xhr.responseType = "blob";
        xhr.onload = function () {
            var urlCreator = window.URL || window.webkitURL;
            var imageUrl = urlCreator.createObjectURL(this.response);
            var tag = document.createElement('a');
            tag.href = imageUrl;
            tag.download = "meme";
            document.body.appendChild(tag);
            tag.click();
            document.body.removeChild(tag);
        }
        xhr.send();
    }
    return (
        <div className="memebnao items-center  text-center">
            <img className="w-auto h-96 border-1 border-black" src={meme.url} alt="meme"></img>

            <div>
                {[...Array(meme.box_count)].map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={`meme caption-${index + 1}`}
                        onChange={(e) => {

                            const newBox = form.boxes;
                            newBox[index] = { text: e.target.value };
                            setForm({ ...form, boxes: newBox });
                        }}>

                    </input>))}
            </div>

            <div className="btns mt-6">
                <span> <button className="backbtn text-xl bg-transparent w-40 h-11 rounded-10 text-green-400 bg-blue-500 cursor-pointer" title="Back" onClick={() => { setMeme(null) }}>Back</button></span>
                <span><button className="generatebutton mt-7 h-11 w-48 ml-16 bg-transparent text-1.1rem rounded-10 text-green-400 bg-blue-500 cursor-pointer" onClick={generatememe}>Generate Meme</button></span>
                <span><button className="generatebutton mt-7 h-11 w-48 ml-16 bg-transparent text-1.1rem rounded-10 text-green-400 bg-blue-500 cursor-pointer" onClick={save} >Save</button></span>

            </div>
        </div>
    );
}

export default Meme;