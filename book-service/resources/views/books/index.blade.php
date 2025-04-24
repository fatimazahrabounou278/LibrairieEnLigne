<!DOCTYPE html>
<html>

<head>
    <title>Livres en stock</title>
</head>

<body>
    <h1>Catalogue de Livres (en stock)</h1>

    <form method="GET" action="{{ url('/livres') }}">
        <input type="text" name="title" placeholder="Titre" value="{{ request('title') }}">
        <input type="text" name="category" placeholder="Catégorie" value="{{ request('category') }}">
        <input type="number" step="0.01" name="min_price" placeholder="Prix min" value="{{ request('min_price') }}">
        <input type="number" step="0.01" name="max_price" placeholder="Prix max" value="{{ request('max_price') }}">
        <button type="submit">Rechercher</button>
    </form>

    <ul>
        @forelse ($books as $book)
        <li>
            <strong>{{ $book->title }}</strong> par {{ $book->author }}<br>
            {{ $book->price }} € - {{ $book->category }}<br>
            Stock : {{ $book->stock }}
            <hr>
        </li>
        @empty
        <li>Aucun livre en stock ne correspond à votre recherche.</li>
        @endforelse
    </ul>
</body>

</html>