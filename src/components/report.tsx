import React, {SyntheticEvent, useState} from 'react';

interface IProps {
  lng: number;
  lat: number;
  favorite: boolean;
  setFavorite: React.Dispatch<boolean>;
}

const Report: React.FC<IProps> = ({ lat, lng, favorite, setFavorite }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [buttonEnable, setButtonEnable] = useState(false);

  const handleChange = (event: SyntheticEvent) => {
    const target = (event.target as HTMLInputElement);
    const { name, value } = target;
    setButtonEnable(value.length > 0);
    switch (name) {
      case 'title':
        setTitle(value);
        break;
      case 'body':
        setBody(value);
        break;
    }
  };

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();
    const target = (event.target as HTMLFormElement);
    const data = new FormData(target);
    data.append('userId', 'userId');
    // @ts-ignore
    data.append('lat', lat);
    // @ts-ignore
    data.append('lng', lng);
    // @ts-ignore
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    fetch("http://localhost:4000/report", {
      method: 'POST',
      mode: 'no-cors',
      body: data,
    })
      .then(response => response.json())
      .catch(error => console.log(error));
    setTitle('');
    setBody('');
    setButtonEnable(false);
  };

  const handleFavClick = () => {
    setFavorite(!favorite);
  };

  return (
    <div
      className="text-left border shadow bg-light p-2"
      dir="rtl"
      style={{ height: "100vh" }}
    >
      <h4 className="text-info mt-2 text-center">דיווח</h4>
      <p>מיקום:</p>
      {!lng && <p>נא לסמן נקודה על המפה</p>}
      {lat && <p className="my-0">קו רוחב - {lat.toFixed(2)}</p>}
      {lng && <p className="my-0">קו אורך - {lng.toFixed(2)}</p>}
      {lng && (
        <p>
          הוסף נקודה למועדפים
          <i
            className={ favorite ? "far fa-star fav-star" : "far fa-star" }
            onClick={handleFavClick}
          />
        </p>
      )}

      {lng && lat && (
        <form
          action="http://localhost:4000/report"
          method="post"
          encType="multipart/form-data"
          className="mt-3"
          onSubmit={handleSubmit}
        >
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">נושא</label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={handleChange}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="הקלד נושא"
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlTextarea1">הקלד דיווח</label>
            <textarea
              className="form-control"
              value={body}
              onChange={handleChange}
              name="body"
              id="exampleFormControlTextarea1"
              rows={3}
            />
          </div>
          <div className="form-group">
            <label htmlFor="exampleFormControlFile1">הוספת קובץ</label>
            <input
              type="file"
              multiple
              onChange={handleChange}
              name="myFiles"
              className="form-control-file"
              id="exampleFormControlFile1"
            />
          </div>
          <button disabled={!buttonEnable} className="btn btn-info btn-block mt-5">דווח</button>
        </form>
      )}
    </div>
  );
};

export default Report;
