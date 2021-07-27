btnSearch.addEventListener("click",function(e) {
    e.preventDefault()
    if (localStorage.getItem(localStorageKey) == "") {    
        alert("Tidak ada data buku");
        return location.reload();
    }else{
        const getByTitle = getData().filter(a => a.title == searchValue.value.trim());
        if (getByTitle.length == 0) {
            const getByAuthor = getData().filter(a => a.author == searchValue.value.trim());
            if (getByAuthor.length == 0) {
                const getByYear = getData().filter(a => a.year == searchValue.value.trim());
                if (getByYear.length == 0) {
                    alert(`Data yang anda cari tidak ditemukan`);
                    return location.reload();
                }else{
                    showSearchResult(getByYear);
                }
            }else{
                showSearchResult(getByAuthor);
            }
        }else{
            showSearchResult(getByTitle);
        }
    }

    searchValue.value = '';
})

function showSearchResult(books) {
    const searchResult = document.querySelector("#searchResult");

    searchResult.innerHTML = '';

    books.forEach(book => {
        let el = `
        <article class="book_item">
            <h3>Hasil Pencarian :</h3><p class="search">Pencarian menunjukkan bahwa data berasal dari buku "${book.title}" </p>
            <h3>${book.title}</h3>
            <p>Penulis: ${book.author}</p>
            <p>Tahun: ${book.year}</p>
            <p class="ket">Keterangan : <span>${book.isCompleted ? 'Sudah dibaca' : 'Belum selesai dibaca'}</span></p>
        </article>
        `

        searchResult.innerHTML += el;
    });
}

function readedBook(id) {
    let cfm = confirm("Pindahkan buku ke Rak Selesai Dibaca?");

    if (cfm == true) {
        const bookDataDetail = getData().filter(a => a.id == id);
        const newBook = {
            id: bookDataDetail[0].id,
            title: bookDataDetail[0].title,
            author: bookDataDetail[0].author,
            year: bookDataDetail[0].year,
            isCompleted: true
        }

        const bookData = getData().filter(a => a.id != id);
        localStorage.setItem(localStorageKey,JSON.stringify(bookData));

        insertData(newBook);
    }else{
        return 0;
    }
}

function unreadedBook(id) {
    let cfm = confirm("Pindahkan buku ke Rak Belum Selesai Dibaca?")

    if (cfm == true) {
        const bookDataDetail = getData().filter(a => a.id == id);
        const newBook = {
            id: bookDataDetail[0].id,
            title: bookDataDetail[0].title,
            author: bookDataDetail[0].author,
            year: bookDataDetail[0].year,
            isCompleted: false
        }

        const bookData = getData().filter(a => a.id != id);
        localStorage.setItem(localStorageKey,JSON.stringify(bookData));

        insertData(newBook);
    }else{
        return 0;
    }
}