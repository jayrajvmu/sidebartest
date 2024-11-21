import React from 'react';
import "./Nav2.css"

export default function Nav2() {
  return (
    <nav class="navbar navbar-expand-lg shadow-sm">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">Navbar</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Categories
                    </a>
                    <div class="dropdown-menu px-3 rounded-3 border-0 shadow">
                        <div class="row">
                            <div class="col-sm-6">
                                <a href="#">
                                    <div class="d-flex align-items-center py-3 px-1 rounded-3">
                                        <div class="icon px-3 bg-warning-subtle rounded-3 fs-1">
                                            <i class="bi bi-tv"></i>
                                        </div>
                                        <div class="text ps-3">
                                            <h5>Television</h5>
                                            <div>Irure incididunt eu irure quis ipsum
                                                occaecat dolor quis.</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-sm-6">
                                <a href="#">
                                    <div class="d-flex align-items-center py-3 px-1 rounded-3">
                                        <div class="icon px-3 bg-danger-subtle rounded-3 fs-1">
                                            <i class="bi bi-headphones"></i>
                                        </div>
                                        <div class="text ps-3">
                                            <h5>Headphones</h5>
                                            <div>Irure incididunt eu irure quis ipsum
                                                occaecat dolor quis.</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-sm-6">
                                <a href="#">
                                    <div class="d-flex align-items-center py-3 px-1 rounded-3">
                                        <div class="icon px-3 bg-success-subtle rounded-3 fs-1">
                                            <i class="bi bi-phone"></i>
                                        </div>
                                        <div class="text ps-3">
                                            <h5>Smartphone</h5>
                                            <div>Irure incididunt eu irure quis ipsum
                                                occaecat dolor quis.</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-sm-6">
                                <a href="#">
                                    <div class="d-flex align-items-center py-3 px-1 rounded-3">
                                        <div class="icon px-3 bg-secondary-subtle rounded-3 fs-1">
                                            <i class="bi bi-laptop"></i>
                                        </div>
                                        <div class="text ps-3">
                                            <h5>Laptop</h5>
                                            <div>Irure incididunt eu irure quis ipsum
                                                occaecat dolor quis.</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-sm-6">
                                <a href="#">
                                    <div class="d-flex align-items-center py-3 px-1 rounded-3">
                                        <div class="icon px-3 bg-body-tertiary rounded-3 fs-1">
                                            <i class="bi bi-smartwatch"></i>
                                        </div>
                                        <div class="text ps-3">
                                            <h5>Smartwatch</h5>
                                            <div>Irure incididunt eu irure quis ipsum
                                                occaecat dolor quis.</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                            <div class="col-sm-6">
                                <a href="#">
                                    <div class="d-flex align-items-center py-3 px-1 rounded-3">
                                        <div class="icon px-3 bg-info-subtle rounded-3 fs-1">
                                            <i class="bi bi-earbuds"></i>
                                        </div>
                                        <div class="text ps-3">
                                            <h5>Earbuds</h5>
                                            <div>Irure incididunt eu irure quis ipsum
                                                occaecat dolor quis.</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link disabled" aria-disabled="true">Disabled</a>
                </li>
            </ul>
            <form class="d-flex" role="search">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
        </div>
    </div>
</nav>
  )
}
