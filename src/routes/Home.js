import { dbService } from "fbase";
import { useCallback, useEffect, useState } from "react";

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [contents, setContents] = useState([]);

  useEffect(() => {
    dbService.collection("nweets").onSnapshot((snapshot) => {
      const nweetArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContents(contents.concat(nweetArray));
    });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    dbService.collection("nweets").add({
      text: nweet,
      createdAt: Date.now(),
      createrId: userObj.uid, //누가 생성했는지 알 수 있음
    });
    setNweet("");
  };
  const onChange = (e) => {
    setNweet(e.target.value);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={nweet}
          onChange={onChange}
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="nweet" />
      </form>
      <div>
        {contents.map((nweets) => (
          <div key={nweets.id}>{nweets.text}</div>
        ))}
      </div>
    </div>
  );
};

export default Home;
