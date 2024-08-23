import * as React from 'react';
import styles from '../styles/DrawerNoticias.module.scss';
import type { ICategoryItem, IDrawerNoticiasProps, IReducerState } from '../interfaces';
import { Breadcrumb, BreadcrumbButton, BreadcrumbDivider, BreadcrumbItem, Divider, MessageBar, MessageBarBody, MessageBarTitle } from "@fluentui/react-components";
import { Arrow } from './Arrow/Arrow';
import {
  AppItem,
  NavDrawer,
  NavDrawerBody,
  NavItem,
} from "@fluentui/react-nav-preview";
import { SPHttpClient } from '@microsoft/sp-http';
import { reducerDrawer } from '../reducers/reducerDrawer';
import { StateActions } from '../enums';
import { Spinner } from '@fluentui/react';

const initialState: IReducerState = {
  loading: false,
  categories: [
    {
      Title: "Todas las Categorías",
      Categor_x00ed_as: "Todas Las Categorías",
      ContentTypeId: "default_content_type_id",
    }
  ],
  error: undefined,
  selectedCategory: "Todas Las Categorías"
}

const DrawerNoticias:React.FC<IDrawerNoticiasProps> = ({ context }) => {

  const url = context.pageContext.web.absoluteUrl + "/_api/web/lists/getbytitle('Categorias')/items";
  const [state, dispatch] = React.useReducer(reducerDrawer, initialState)  
  
  const navigateToHome = ():void => {
    window.location.href = context.pageContext.web.absoluteUrl;
  }

  const setCategories = (data:any):void => {
    const categories = (data.value ?? []) as ICategoryItem[];
    dispatch({ type: StateActions.SET_CATEGORIES, payload: [ ...state.categories, ...categories ] });
    console.log(state.categories);
  }

  const onError = (error:any):void => { 
    dispatch({ type: StateActions.ERROR, payload: error.message });
    console.error('Error loading data', error);
  }

  const onLoading = ():void => { 
    dispatch({ type: StateActions.LOADING, payload: initialState });
  }

  const onCategoryChange = (_:any, data:any):void => {
    dispatch({ type: StateActions.SELECT_CATEGORY, payload: data.value });
  }

  const fetchData = async (): Promise<void> => {
    onLoading();

    try {
      const response = await context.spHttpClient.get(url, SPHttpClient.configurations.v1, {
        headers: { 'Accept': 'application/json;odata=nometadata', 'odata-version': '' }
      });
      const data = await response.json();
      if(data.hasOwnProperty('odata.error')) {
        throw new Error(data['odata.error'].message.value);
      }
      setCategories(data);
      
    } catch (error) {
      onError(error);
    }
  };

  React.useEffect(() => {
    fetchData()
    .catch((err) => {
      console.log(err);
    });
  }, [])

  return (
    <>
      <div className={styles.root}>
      <div className={styles.header}>
        <button className={styles.button} onClick={navigateToHome}>
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
              {context.pageContext.web.title}
            </BreadcrumbButton>
          </BreadcrumbItem>
        </Breadcrumb>
        <h2 className={styles.categoryTitle}>{state.selectedCategory}</h2>
        <p className={styles.count}>{1000} resultados</p>
      </div>
      <Divider className={styles.divider}/>
      { state.loading && <Spinner labelPosition={'left'} label={'Cargando Categorías...'}/> }
      { state.error && 
      <MessageBar key={"error"} intent={"error"}>
        <MessageBarBody >
          <MessageBarTitle>Error</MessageBarTitle>
          <p>{state.error}</p>
        </MessageBarBody>
      </MessageBar> }
      { (!state.error && !state.loading) && state.categories.length !== 0 &&
        <NavDrawer
          defaultSelectedValue={state.selectedCategory}
          onNavItemSelect={onCategoryChange}
          open={true}
          type={"inline"}
          className={styles.navDrawer} // Aplicando estilos personalizados
        >
          <NavDrawerBody>
            <AppItem as="a" className={styles.titleItem}>Categorías</AppItem>
            {!state.error && state.categories.length !== 0 && state.categories.map((x:ICategoryItem) => (
              <NavItem
                className={styles.navItem}
                key={x.ContentTypeId}
                value={x.Categor_x00ed_as}
                as="a"
              >{x.Title}</NavItem>
            ))}
          </NavDrawerBody>
        </NavDrawer> 
      }
    </div>
    </>
  );
}

export default DrawerNoticias;