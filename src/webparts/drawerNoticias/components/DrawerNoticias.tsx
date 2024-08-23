import * as React from 'react';
import styles from '../styles/DrawerNoticias.module.scss';
import type { ICategoryItem, IDrawerNoticiasProps } from '../interfaces';
import { Breadcrumb, BreadcrumbButton, BreadcrumbDivider, BreadcrumbItem, Divider } from "@fluentui/react-components";
import { Arrow } from './Arrow/Arrow';
import {
  AppItem,
  NavDrawer,
  NavDrawerBody,
  NavItem,
} from "@fluentui/react-nav-preview";
import { SPHttpClient } from '@microsoft/sp-http';


const DrawerNoticias:React.FC<IDrawerNoticiasProps> = ({ context }) => {

  const defaultCategory = "Todas Las Categorías";

  const [selectedValue, setSelectedValue] = React.useState<string>(defaultCategory);
  const [categories, setCategories] = React.useState<ICategoryItem[]>([]);
  
  
  const onSelectedValue = (_:any, data:any):void => {
    setSelectedValue(data?.value ?? defaultCategory); 
  }

  const fetchData = async () => {
    const url = context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Categorias')/items";
    try {
      const response = await context.spHttpClient.get(url, SPHttpClient.configurations.v1, {
        headers: {
          'Accept': 'application/json;odata=nometadata',
          'odata-version': ''
        }
      });

      const data = await response.json();
      console.log(data.value);
      setCategories(data.value ?? []);
    } catch (error) {
      console.error('Error loading data', error);
    }
  };

  React.useEffect(() => {
    setSelectedValue(defaultCategory);
    fetchData()
    .catch((err) => {
      console.log(err);
    });
  }, [])

  return (
    <>
      <div className={styles.root}>
      <div className={styles.header}>
        <button className={styles.button}>
          <Arrow direction='left' width={8} height={17} />
          <span>Regresar</span>
        </button>
        <Breadcrumb className={styles.breadcrumb}>
          <BreadcrumbItem>
            <BreadcrumbButton>Home</BreadcrumbButton>
          </BreadcrumbItem>
          <BreadcrumbDivider />
          <BreadcrumbItem>
            <BreadcrumbButton>
              Centro De Comunicaciones
            </BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
        {
          categories.length !== 0 ?
          <h2 className={styles.categoryTitle}>{categories.filter((x:ICategoryItem) => x.Title === selectedValue)[0]?.Title}</h2>
          : <h2>{defaultCategory}</h2>
        }
        
        <p className={styles.count}>{1000} resultados</p>
      </div>
      <Divider className={styles.divider}/>
      <NavDrawer
        defaultSelectedValue={selectedValue}
        onNavItemSelect={onSelectedValue}
        open={true}
        type={"inline"}
        className={styles.navDrawer} // Aplicando estilos personalizados
      >
        <NavDrawerBody>
          <AppItem as="a" className={styles.titleItem}>Categorías</AppItem>
          {categories !== null && categories.map((x) => (
            <NavItem
              className={styles.navItem}
              key={x.ContentTypeId}
              value={x.Categor_x00ed_as}
              as="a"
            >{x.Title}</NavItem>
          ))}
        </NavDrawerBody>
      </NavDrawer>
    </div>
    </>
  );
}

export default DrawerNoticias;