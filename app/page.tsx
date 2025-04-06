
'use client';

import { useState } from "react";
import BigQueryComponent from "@/components/BigQueryComponent";
import MapQueryComponent from "@/components/MapQueryComponent";
import styles from "./page.module.css";

export default function Home() {
  const [queryParams, setQueryParams] = useState({
    epc: '',
  });

  const [triggerQuery, setTriggerQuery] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent page reload
    const formData = new FormData(e.currentTarget);
    
    const params = {
      epc: formData.get("EPC") as string,
    };

    setQueryParams(params);
    setTriggerQuery(true); 
  };

  return (
    <div>
      {/* Main Banner */}
      <div className={styles.topBanner}>
        <h1 className={styles.topBannerTitle}>Store 359 EPC Finder</h1>
      </div>

      <div className={styles.mainCanvasOuterContainer}>
        {/* Form Container */}
        <div className={styles.mainCanvasInnerLeftRowContainer}>
          <form onSubmit={handleSubmit} className={styles.mainCanvasInnerLeftRowContainerItem}>
            <input name="Start Date" placeholder="Start Date" className={styles.formInputFields} />
            <input name="End Date" placeholder="End Date" className={styles.formInputFields} />
            <input name="UPC" placeholder="UPC" className={styles.formInputFields} />
            <input name="EPC" placeholder="EPC" className={styles.formInputFields} />
            <button type="submit" className={styles.formSubmitButton}>Submit</button>
          </form>
        </div>

        {/* Viz Components */}
        <div className={styles.mainCanvasInnerRightVizContainer}>
          <div className={styles.mainCanvasInnerRightVizContainerItem}>
            <MapQueryComponent trigger={triggerQuery} queryParams={queryParams}/>
          </div>
          <div className={styles.mainCanvasInnerRightVizContainerItem}>
            <BigQueryComponent trigger={triggerQuery} queryParams={queryParams} />
          </div>
        </div>
      </div>
    </div>
  );
}

