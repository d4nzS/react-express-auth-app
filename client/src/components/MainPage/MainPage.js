import Toolbar from './Toolbar';
import Users from './Users';

const MainPage = () => {
  return (
    <div className="container mt-5">
      <h2 className="text-center">Users</h2>
      <Toolbar/>

      <div className="row">
        <div className="col-12">
          <Users/>
        </div>
      </div>
    </div>
  );
};

export default MainPage;