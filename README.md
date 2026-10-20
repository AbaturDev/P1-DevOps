# DevOps P1 – Taskly

## Opis

Taskly to prosta aplikacja webowa do zarządzania zadaniami: wyświetlanie listy, dodawanie i usuwanie. Funkcjonalność jest celowo ograniczona do minimum, bo celem projektu jest infrastruktura, a nie sama aplikacja.

Aplikacja składa się z trzech elementów, z których każdy działa na osobnej maszynie wirtualnej:

| Maszyna | Rola | Technologia |
|---|---|---|
| `frontend` | Interfejs użytkownika | React + TypeScript, serwowany przez nginx |
| `backend` | HTTP API | ASP.NET Core (C#, .NET 10) |
| `db` | Baza danych | PostgreSQL |

Przeglądarka łączy się z frontendem, frontend komunikuje się z backendem przez HTTP API, a backend odczytuje i zapisuje dane w bazie.

## Technologie infrastrukturalne

- **Ubuntu Server** – system operacyjny wszystkich maszyn wirtualnych.
- **VirtualBox** – uruchamianie maszyn wirtualnych.
- **Packer** – przygotowanie wspólnego, podstawowego obrazu maszyny wirtualnej.
- **Vagrant** – automatyczne tworzenie i uruchamianie trzech maszyn na podstawie obrazu z Packera.
- **Ansible** – instalacja oprogramowania, konfiguracja usług, zabezpieczenia i wdrożenie aplikacji.

## Co trzeba pobrać

### Infrastruktura

- **VirtualBox 7.x** – hypervisor. Extension Pack nie jest wymagany. Na Windowsie z włączonym Hyper-V (np. przez WSL2 lub Docker Desktop) VirtualBox działa, ale wolniej, więc warto to sprawdzić przed startem.
- **Packer** (HashiCorp) – do zbudowania obrazu. Wymagane pluginy (VirtualBox, Vagrant) Packer pobiera sam przy inicjalizacji projektu.
- **Vagrant** (HashiCorp) – do tworzenia maszyn z obrazu. Po instalacji na Windowsie zwykle trzeba zrestartować system.
- **Ansible** – nie działa natywnie na Windowsie, dlatego uruchamiamy go z **WSL2** (dystrybucja Ubuntu), skąd łączy się z maszynami po SSH.
- **Obraz ISO Ubuntu Server** – nie trzeba pobierać ręcznie. Packer ściąga go automatycznie i weryfikuje sumę kontrolną.

### Wymagania sprzętowe

- Około 8 GB wolnej pamięci RAM (3 maszyny po 1–2 GB).
- Około 30–40 GB wolnego miejsca na dysku (ISO, obraz, dyski maszyn).
- Włączona wirtualizacja sprzętowa (VT-x / AMD-V) w BIOS/UEFI.
- Komputer z procesorem x86_64. Na Macach z procesorem Apple Silicon VirtualBox nie jest dobrym wyborem i trzeba by użyć np. UTM.

## Podział: obraz Packera a Ansible

Do obrazu trafia to, co wspólne dla wszystkich maszyn i rzadko się zmienia:
- zaktualizowany system Ubuntu Server,
- Python 3 (wymagany przez Ansible),
- serwer SSH i użytkownik z dostępem przez klucz,
- dodatki gościa VirtualBox,
- zainstalowany firewall (bez reguł),
- podstawowe narzędzia systemowe.

Ansible odpowiada za wszystko, co zależy od roli maszyny lub często się zmienia:
- instalację PostgreSQL, środowiska uruchomieniowego .NET i nginx na odpowiednich maszynach,
- reguły firewalla dla każdej roli,
- utwardzenie SSH,
- wdrożenie aplikacji, jej konfigurację i sekrety (np. hasło do bazy).

## Bezpieczeństwo

Konfiguracja zabezpieczeń jest realizowana automatycznie przez Ansible:
- **Firewall** na każdej maszynie domyślnie blokuje ruch przychodzący. Otwarte są tylko porty potrzebne danej roli: frontend udostępnia HTTP na zewnątrz, backend przyjmuje ruch tylko od frontendu, a baza tylko od backendu.
- **Blokada logowania na konto root przez SSH.**
- Hasło do bazy danych nie jest trzymane w repozytorium w postaci jawnej.

## Struktura repozytorium

```
backend/    API w ASP.NET Core (minimal API, vertical slices, EF Core + PostgreSQL)
frontend/   Aplikacja React + TypeScript (Vite, axios)
infra/      (planowane) konfiguracja Packera, Vagranta i Ansible
```