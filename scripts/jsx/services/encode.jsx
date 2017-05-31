class EncodeServices {

  static encode(text) {
    if(!text) return "";
    text = text.split(".").join("___");
    text = text.split("[").join("____");
    text = text.split("]").join("_____");
    text = encodeURIComponent(text);
    return text;
  }

  static decode(text) {
    if(!text) return "";
    text = decodeURIComponent(text);
    text = text.split("_____").join("]");
    text = text.split("____").join("[");
    text = text.split("___").join(".");
    return text;
  }

}

export default EncodeServices;