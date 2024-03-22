import {render as renderAmis} from "amis";
import 'amis/lib/themes/cxd.css';
import 'amis/lib/helper.css';
import 'amis/sdk/iconfont.css';

const App = () => {
  let saveButton = renderAmis({
    type: "button",
    label: "保存",
    level: "primary",
    onClick: function () {
      console.log("TEST");
    },
  });
  return (
    <div>
      {saveButton}
    </div>
  );
};

export default App;
