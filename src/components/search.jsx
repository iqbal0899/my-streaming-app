import { useSearchParams } from "react-router-dom";

function Search() {
    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("search");

    return (
        <div>
            <h1>Hasil Pencarian</h1>

            <p>
                Menampilkan hasil untuk: <strong>{keyword}</strong>
            </p>
        </div>
    );
}

export default Search;