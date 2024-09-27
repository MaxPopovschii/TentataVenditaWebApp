import React, { Suspense, useRef } from "react";
import { EditModalProps, createEditModal } from "../screen-templates/EditModal";
import EditModal from "../components/layout-elements/EditModal";
import FileUploader from "../components/FileUploader";
import { AllegatiBasic, DefaultService } from "../services/openapi";

type FormInterface = AllegatiBasic;

export default createEditModal(MainPage);

function MainPage(externalInfo: any) {
  return (
    <Suspense>
      <MainPageInternal {...externalInfo}></MainPageInternal>
    </Suspense>
  );
}
function MainPageInternal(externalInfo: any) {
  const info = {
    ...externalInfo,
  };

  const isActive = true;
  return (
    <EditModal
      isActive={isActive}
      body={() => {
        return (
          <div style={{ marginBottom: 30 }}>
            <FileUploader props={info} />
          </div>
        );
      }}
    />
  );
}
