import React, { Suspense } from "react";
import { createEditModal } from "../screen-templates/EditModal";
import EditModal from "../components/layout-elements/EditModal";
import FileUploader from "../components/FileUploader";

export default createEditModal(MainPageInterventi);

export function MainPageInterventi(externalInfo: any) {
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
