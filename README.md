# react-webpack-redux

Приложение получения данных с внешнего API GitHub - (получение списка репозиториев).

Осуществлен базовый роутинг между основной страницей постов и карточкой отдельного поста.

Выполнена пагинация (особенность - чтобы номер выбранной страницы находился всегда по центру блока пацинации смотри utils/pagesCreator.

Выполнен Loader двумя подходами: 

1) При загрузке всех постов Loader берет свое состояние из Redux. 
    Изменение состояния в true (dispatch) прописываем в actions/repos перед запросом данных.
    Изменение в состояние false - прописываем уже внутри Reduser -  CASE SET_REPOS: 
    return {
        ...state,
        items: action.payload.items,
        totalCount: action.payload.total_count,
        isFetching: false,
      };
      
2) Состояние для Louder созданно внутри компонента карточки Card с помощью useState.

      const [isFetch, setIsFetch] = useState(false);

  async function fetchingRepo() {
    setIsFetch(true);
    await getCurrentRepo(username, reponame, setRepo);
    setIsFetch(false);
  }

  useEffect(() => {
    fetchingRepo();
  }, []);

  return (
    <div>
      {isFetch === false ? (
        <div className="card">
          <img src={repo.owner.avatar_url} alt="" />
          <div className="name">{repo.name}</div>
          <div className="stars">{repo.stargazers_count}</div>
        </div>
      ) : (
        <div className="fetching1"></div>
      )}
      
      
      
Выполнена переадресация на главную страницу при вводе неизвестного адреса
        <Route path="*" element={<Navigate to="/" replace={true} />} />
        
Отловливаем ошибки при получении данных с сервера 


return async (dispatch) => {
    try {
      dispatch(setIsFetching(true));
      const response = await axios.get(
        `https://api.github.com/search/repo2sitories?q=${searchQuery}&sort=stars&per_page=${perPage}&page=${currentPage}`
      );
      dispatch(setRepos(response.data));
    } catch (e) {
      dispatch(setFetchError(true));
      dispatch(setIsFetching(false));
      setTimeout(() => {
        dispatch(setFetchError(false));
      }, 2000);
    }
    
    
    
    Выводим Alert при получении ошибки (подключен через Bootstrap)
    
     {isFetchError && (
        <div className="alert alert-danger" role="alert">
          Error - произошла ошибка
        </div>
      )}
