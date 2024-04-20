import { Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Faculty } from "@prisma/client";

export const Combobox = ({
    selected,
    setSelected,
}: {
    selected: string[]
    setSelected: React.Dispatch<React.SetStateAction<string[]>>
}) => {
    const [query, setQuery] = useState("");
    /*  const [selected, setSelected] = useState([]); */
    const [menuOpen, setMenuOpen] = useState(false);

    const inputRef = useRef(null);

    const [data, setdata] = useState<Faculty[]>()
    const fetchColleges = async () => {
        const response = await fetch("/api/faculty");
        const data = await response.json();
        setdata(data);
    }
    useEffect(() => {
        fetchColleges();
    }, [])

    const filteredTags = data?.filter(
        (item: Faculty) => {
            const name = `${item.firstname.toLocaleLowerCase()} ${item.lastname.toLocaleLowerCase()}`;
            /*  const val = data?.filter((item) => !selected.includes(item.id))
             console.log({ val }) */
            return !selected.includes(item.id) && name.toLocaleLowerCase()?.includes(query.toLocaleLowerCase()?.trim())

        }
    );

    const isDisable =
        !query?.trim() ||
        selected.filter(
            (item) =>
                item?.toLocaleLowerCase()?.trim() === query?.toLocaleLowerCase()?.trim()
        )?.length;

    return (
        <div className="relative col-span-12 text-sm">
            {selected?.length ? (
                <div className="bg-background w-full relative flex flex-wrap gap-1 mb-2">
                    {selected.map((tag) => {
                        return (
                            <div
                                key={tag}
                                className="rounded-full w-fit h-10 px-3 border bg-card text-card-foreground
                  flex items-center gap-2"
                            >
                                {data?.find((item) => item.id === tag)?.lastname}, {data?.find((item) => item.id === tag)?.firstname} {data?.find((item) => item.id === tag)?.middleInitial && `${data?.find((item) => item.id === tag)?.middleInitial}.`}
                                <div
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() =>
                                        setSelected(selected.filter((i) => i !== tag))
                                    }
                                >
                                    <X className="h-4 w-4 cursor-pointer hover:text-muted-foreground" />
                                </div>
                            </div>
                        );
                    })}
                    <div className="w-full text-right">
                        <span
                            className="text-gray-400 cursor-pointer"
                            onClick={() => {
                                setSelected([]);
                                (inputRef.current as any)?.focus();
                            }}
                        >
                            Clear all
                        </span>
                    </div>
                </div>
            ) : null}
            <div className="card flex items-center justify-between col-span-12 gap-2.5">
                <Input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value.trimStart())}
                    placeholder="Search..."
                    className="bg-transparent text-sm flex-1"
                    onFocus={() => setMenuOpen(true)}
                    onBlur={() => setMenuOpen(false)}
                /* onKeyDown={(e) => {
                    if (e.key === "Enter" && !isDisable) {
                        setSelected((prev) => [...prev, query]);
                        setQuery("");
                        setMenuOpen(true);
                    }
                }} */
                />
                {/*  <Button
                    className="text-sm  disabled:cursor-not-allowed"
                    disabled={isDisable}
                    onClick={() => {
                        if (isDisable) {
                            return;
                        }
                        setSelected((prev) => [...prev, query]);
                        setQuery("");
                        inputRef.current?.focus();
                        setMenuOpen(true);
                    }}
                >
                    Add
                </Button> */}
            </div>

            {/* Menu's */}
            {menuOpen ? (
                <div className="bg-card z-10 absolute w-full max-h-52 mt-2 p-1 flex overflow-y-auto scrollbar-thin scrollbar-track-slate-50 scrollbar-thumb-slate-200">
                    <ul className="w-full">
                        {filteredTags?.length ? (
                            filteredTags?.map((item: Faculty) => (
                                <li
                                    key={item.id}
                                    className="p-2 cursor-pointer hover:bg-muted hover:text-muted-foreground rounded-md w-full"
                                    onMouseDown={(e) => e.preventDefault()}
                                    onClick={() => {
                                        setMenuOpen(true);
                                        setSelected((prev) => [...prev, item.id]);
                                        setQuery("");
                                    }}
                                >
                                    {item.lastname}, {item.firstname} {item.middleInitial && `${item.middleInitial}.`} {item.suffix}
                                </li>
                            ))
                        ) : (
                            <li className="p-2 text-gray-500">No options available</li>
                        )}
                    </ul>
                </div>
            ) : null}
        </div>
    );
};

