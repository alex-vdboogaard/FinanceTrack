import { useState, useEffect } from "react";
import Button from "../../components/button/Button";
export default function Budget() {
    return (
        <main>
            <h1>Budget</h1>
            <Button className="primary-btn">+ Monthly review</Button>
        </main>
    )
}