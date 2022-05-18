import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LinksPage from "./pages/LinksPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import AuthPage from "./pages/AuthPage";
export const useRoutes = (isAuthentificated) => {
    if (isAuthentificated.token) {
        return (
            <Routes>
                <Route path='/links' element={<LinksPage />} />
                <Route path='/detail/:id' element={<DetailPage />} />
                <Route path='/*' element={<Navigate replace to='/links' />} />
                <Route path='/create' element={<CreatePage />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route path='/links' element={<LinksPage />} />
            <Route path='/detail/:id' element={<DetailPage />} />
            <Route path='/autorithation' element={<AuthPage />} />
            <Route path='/*' element={<Navigate replace to='/links' />} />
        </Routes>
    );
};
