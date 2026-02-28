import { useParams } from "react-router-dom";
import Detail1 from "./Detail1";
import Detail2 from "./Detail2";
import Detail3 from "./Detail3";
import Detail4 from "./Detail4";
import Detail5 from "./Detail5";
import Detail6 from "./Detail6";
import Detail7 from "./Detail7";
import Detail8 from "./Detail8";
import Detail9 from "./Detail9";
import Detail10 from "./Detail10";
import Detail11 from "./Detail11";
import Detail12 from "./Detail12";
import Detail13 from "./Detail13";
import Detail14 from "./Detail14";
import Detail15 from "./Detail15";
import Detail16 from "./Detail16";
// jitne bhi detail components hain sab import karo

export default function Details() {
    const { id } = useParams();

    if (id === "1") return <Detail1 />;
    if (id === "2") return <Detail2 />;
    if (id === "3") return <Detail3 />;
    if (id === "4") return <Detail4 />;
    if (id === "5") return <Detail5 />;
    if (id === "6") return <Detail6 />;
    if (id === "7") return <Detail7 />;
    if (id === "8") return <Detail8 />;
    if (id === "9") return <Detail9 />;
    if (id === "10") return <Detail10 />;
    if (id === "11") return <Detail11 />;
    if (id === "12") return <Detail12 />;
    if (id === "13") return <Detail13 />;
    if (id === "14") return <Detail14 />;
    if (id === "15") return <Detail15 />;
    if (id === "16") return <Detail16 />;

    return <h2>Detail Not Found</h2>;
}