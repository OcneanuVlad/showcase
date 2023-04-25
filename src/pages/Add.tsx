function Add() {
  return (
    <div>
      <form className="form" method="POST" action="http://localhost:3000/work" encType="multipart/form-data">
        <label>Title:</label>
        <input type="text" name="title" />
        <label>Link:</label>
        <input type="text" name="link" />
        <label>Image:</label>
        <input type="file" accept="image/*" name="file" />
        <input type="submit" name="submit" />
      </form>
    </div>
  );
}

export default Add;
