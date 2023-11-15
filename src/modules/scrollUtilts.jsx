export const scrolltoAbout = () => {
    const formElement = document.getElementById("second-block");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };
export const scrolltoProcess = () => {
    const formElement = document.getElementById("third-block");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
}