import React, { useState } from "react";
import { Button } from "antd";

import CreateForm from "./component/CreateForm";


function App() {
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    setVisible(false);
  };

  return (
    <div>
    <Button
      type="primary"
      onClick={() => {
        setVisible(true);
      }}
    >
      New Collection
    </Button>
    <CreateForm
      visible={visible}
      setVisible={setVisible}
      onCreate={onCreate}
    />
  </div>
  );
}

export default App;
