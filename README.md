# cros-ddl
Easy-to-Use DDL API for your CrOS mirror

## Building
```sh
$ git clone https://github.com/scaratech/cros-ddl
$ cd cros-ddl
$ pnpm i
$ pnpm build
$ pnpm start
```

## Configuration
Example `config.json`
```json
{
    "recovery-images": {
        "official": {
            "board": {
                "v131": "./path_to_image.bin"
            }
        },

        "pre-builts": {
            "bad-recovery": {
                "board": "./path_to_image.bin"
            },

            "e-halycon": {
                "board": "./path_to_image.bin"
            }
        }
    },

    "rma-shims": {
        "raw": {
            "board": "./path_to_image.bin"
        },

        "pre-builts": {
            "sh1mmer-legacy": {
                "board": "./path_to_image.bin"
            }
        }
    }
}
```

## API Usage
```
https://ddl.example.com/shim?type=&board=
type = raw/name-of-prebuilt
board = chromeos-board

https://ddl.example.com/reco?type=&board=&?ver=
type = official/name-of-prebuilt
board = chromos-board
version (optional, for official images) = chromeos-version (v111)
```
