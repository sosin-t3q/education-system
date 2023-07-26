import { Dispatch } from 'react';
import styles from "./VisionAccordion.module.css";
import { ReactComponent as ArrowDown } from "@/assets/arrow-down.svg";
import { ReactComponent as ArrowUp } from "@/assets/arrow-up.svg";


interface Props {
    title: string;
    section: {
        id: number;
        title: string;
    }[]
    isActiveSection: boolean;
    setActiveIndex: Dispatch<React.SetStateAction<number | null>>;
    sectionIndex: number;

}

const VisionAccordion = ({title, section, isActiveSection, setActiveIndex, sectionIndex}: Props) => {
    const toggleSection = () => {
        const nextIndex = isActiveSection ? null : sectionIndex;
        setActiveIndex(nextIndex);                               
    }

    return (
        <>
            <div className={styles.title} onClick={toggleSection}>
                <span>{title}</span>
                { isActiveSection ? <ArrowUp /> : <ArrowDown /> }
            </div>
            {
                isActiveSection && ( 
                    <div className={styles.body}>
                        {
                            section.map(item => {
                                return(
                                    <div className={styles.block} key={item.id}>
                                        <span className={styles.text}>{item.title}</span>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            }
        </>
    )
}

export default VisionAccordion;