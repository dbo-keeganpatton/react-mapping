import BigQueryComponent from "@/components/BigQueryComponent";
import MapQueryComponent from "@/components/MapQueryComponent";
import styles from "./page.module.css";
import Form from "next/form"

export default function Home() {
  return (
    <div>
       
       {/* Main Banner */}
       <div className={styles.topBanner}>
            <h1 className={styles.topBannerTitle}>Store 359 EPC Finder</h1>
        </div>

      <div className={styles.mainCanvasOuterContainer}>     
       
        <div className={styles.mainCanvasInnerLeftRowContainer}> 
            <Form action="" className={styles.mainCanvasInnerLeftRowContainerItem}>
                <input name="Start Date" placeholder="Start Date" className={styles.formInputFields} />
                <input name="End Date"  placeholder="End Date" className={styles.formInputFields} />
                <input name="UPC"  placeholder="UPC" className={styles.formInputFields} />
                <input name="EPC" placeholder="EPC" className={styles.formInputFields} />
                <button type="submit" className={styles.formSubmitButton}>Submit</button>
            </Form>
        </div>
        
        <div className={styles.mainCanvasInnerRightVizContainer}> 
            <div className={styles.mainCanvasInnerRightVizContainerItem}><MapQueryComponent /></div>
            <div className={styles.mainCanvasInnerRightVizContainerItem}><BigQueryComponent /></div>
        </div>
      
      </div>

    </div>
  );
}
