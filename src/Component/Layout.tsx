import { Link } from "react-router-dom";
import styled from "styled-components";

interface ILayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: ILayoutProps) {
  return (
    <LayoutContainer>
      <div className="sideBar">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/form">useCustomForm</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="main">{children}</div>
    </LayoutContainer>
  );
}

const LayoutContainer = styled.div`
  display: flex;
  .sideBar {
    padding: 20px 0px;
    width: 200px;
    height: 100vh;
    background-color: black;
    ul {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      > li {
        padding: 10px 0px;
        > a {
          color: white;
        }
      }
    }
  }
  .main {
    width: 1200px;
    padding: 30px;
    margin: 0 auto;
  }
`;
