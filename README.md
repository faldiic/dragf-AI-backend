
# Dragf-AI Backend

Projek ini dibuat untuk menyelesaikan tugas Capstone dari Coding Camp 2025 powered by DBS and Dicoding.

Projek ini mengembangkan sistem klasifikasi warna kulit yang mempertimbangkan tone secara lebih akurat dan inklusif, berbasis pada skala Monk Skin Tone (MST). Sistem ini ditenagai oleh teknologi kecerdasan buatan dan pemrosesan citra, sehingga mampu memberikan rekomendasi warna secara otomatis tanpa memerlukan input manual dari pengguna.


## API Reference

#### Post Items

```http
  POST /dragf-AI-secret-api/predict
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `file` | `file` | **Required**. PNG or JPG image, and file size 4MB max|

## Run Server Locally

Clone the project

```bash
  git clone https://github.com/faldiic/dragf-AI-backend
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  pip install -r requirements.txt
```

Start the server

```bash
  py app.py
```


## Tech Stack

**Front-End:** ReactJS

**Back-End:** Flask, Tensorflow

