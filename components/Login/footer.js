import { useTranslation } from "react-i18next";
import "../../i18n/i18n";

export default function Footer(props) {
  return (
    <div className="absolute bottom-6 left-0 min-w-full">
      <hr className="pb-4" />
      <div className="flex flex-row items-center justify-evenly">
      <p style={{color:"white" }} >@Copyright Sebastian Khuu-Vasquez &#129315;</p>
      </div>
    </div>
  );
}
