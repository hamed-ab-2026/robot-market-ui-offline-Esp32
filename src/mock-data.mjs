/**
 * Development-only data for the Robot Market UI.
 * This module is loaded dynamically only when VITE_DEV_MODE=true.
 */
export const mockData = {
    dashboard: {
        "today": {
            "sales": 2850000,
            "transactions": 47,
            "active_products": 44,
            "device_status": "online"
        },
        "last_sale": {
            "product": "Coca Cola",
            "price": 45000,
            "channel": 12,
            "customer": "09123456789",
            "payment_method": "wallet",
            "time": "2026-07-15T13:42:18Z"
        },
        "speaker": {
            "volume": 75,
            "muted": false
        },
        "most_sold": {
            "today": {
                "name": "Coca Cola",
                "count": 14
            },
            "week": {
                "name": "Mineral Water",
                "count": 82
            },
            "month": {
                "name": "Potato Chips",
                "count": 341
            }
        },
        "device": {
            "info": {
                "name": "Vending Machine #001",
                "model": "VM-ESP32-S3",
                "serial": "VM202607150001",
                "status": "online",
                "uptime": "14d 06h 32m"
            },
            "wifi": {
                "connected": true,
                "ssid": "RobotMarket2",
                "ip": "192.168.1.12",
                "mac": "00:70:07:27:B2:38",
                "rssi": -69,
                "signal_quality": 60,
                "frequency": "2.4GHz"
            },
            "firmware": {
                "current": {
                    "version": "v1.4.2",
                    "build": "20260715",
                    "date": "2026-07-15T09:30:00Z",
                    "status": "stable"
                },
                "available": {
                    "version": "v1.5.0",
                    "build": "20260720",
                    "description": "Improved payment handling and WiFi stability",
                    "size": 5242880,
                    "mandatory": false
                },
                "rollback": {
                    "available": true,
                    "version": "v1.4.1",
                    "build": "20260701",
                    "date": "2026-07-01T08:00:00Z"
                }
            },
            "health": {
                "cpu_usage": 23,
                "memory": {
                    "free": 208656,
                    "total": 323492
                },
                "storage": {
                    "free": 555714,
                    "used": 280367,
                    "total": 836081
                }
            },
            "services": [
                {
                    "name": "Database",
                    "status": "running",
                    "last_check": "2026-07-15T13:42:18Z"
                },
                {
                    "name": "Payment",
                    "status": "running",
                    "last_check": "2026-07-15T13:42:10Z"
                },
                {
                    "name": "Cloud Sync",
                    "status": "offline",
                    "last_check": "2026-07-15T12:00:00Z"
                }
            ]
        },
        "warnings": [
            {
                "title": "Low Stock",
                "message": "Channel 8 is almost empty.",
                "status": "warning",
                "time": "2026-07-15T11:24:00Z"
            },
            {
                "title": "WiFi Signal Weak",
                "message": "RSSI dropped below -75 dBm.",
                "status": "warning",
                "time": "2026-07-15T10:58:00Z"
            }
        ],
        "notifications": [
            {
                "title": "Firmware Updated",
                "message": "ESP firmware updated successfully.",
                "status": "success",
                "time": "2026-07-15T09:00:00Z"
            },
            {
                "title": "New Customer",
                "message": "A new customer account was created.",
                "status": "info",
                "time": "2026-07-15T08:25:00Z"
            }
        ],
        "latest_activity": [
            {
                "title": "Sale Completed",
                "description": "Potato Chips sold from channel 6.",
                "status": "success",
                "time": "2026-07-15T13:42:18Z"
            },
            {
                "title": "Balance Charged",
                "description": "Wallet charged with 500000 Rials.",
                "status": "info",
                "time": "2026-07-15T13:15:03Z"
            },
            {
                "title": "Door Opened",
                "description": "Operator opened the machine.",
                "status": "warning",
                "time": "2026-07-15T12:48:51Z"
            }
        ],
        "sales_chart": {
            "day": {
                "period": "24h",
                "currency": "IRR",
                "labels": [
                    "00",
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23"
                ],
                "series": [
                    {
                        "sales": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            1000,
                            700,
                            500,
                            0,
                            500,
                            700,
                            1000,
                            700,
                            500,
                            0,
                            500,
                            700,
                            100000,
                            700,
                            500,
                            0
                        ],
                        "transactions": [
                            0,
                            0,
                            0,
                            0,
                            0,
                            0,
                            2,
                            4,
                            2,
                            5,
                            4,
                            5,
                            8,
                            11,
                            9,
                            7,
                            8,
                            7,
                            6,
                            5,
                            3,
                            2,
                            1,
                            0
                        ]
                    }
                ],
                "meta": {
                    "from": "2025-08-01",
                    "to": "2026-07-31",
                    "total_sales": 776500000,
                    "total_transactions": 78
                }
            },
            "week": {
                "period": "7d",
                "currency": "IRR",
                "labels": [
                    "Sat",
                    "Sun",
                    "Mon",
                    "Tue",
                    "Wed",
                    "Thu",
                    "Fri"
                ],
                "series": [
                    {
                        "sales": [
                            120000,
                            80000,
                            0,
                            150000,
                            220000,
                            90000,
                            170000
                        ],
                        "transactions": [
                            8,
                            6,
                            0,
                            12,
                            15,
                            5,
                            10
                        ]
                    }
                ],
                "meta": {
                    "from": "2026-07-09",
                    "to": "2026-07-15",
                    "total_sales": 830000,
                    "total_transactions": 48
                }
            },
            "month": {
                "period": "31d",
                "currency": "IRR",
                "labels": [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12",
                    "13",
                    "14",
                    "15",
                    "16",
                    "17",
                    "18",
                    "19",
                    "20",
                    "21",
                    "22",
                    "23",
                    "24",
                    "25",
                    "26",
                    "27",
                    "28",
                    "29",
                    "30",
                    "31"
                ],
                "series": [
                    {
                        "sales": [
                            1850000,
                            2140000,
                            1680000,
                            2390000,
                            2010000,
                            2190000,
                            1980000,
                            2310000,
                            2620000,
                            2750000,
                            2430000,
                            2060000,
                            2260000,
                            2510000,
                            2850000,
                            2720000,
                            2440000,
                            2360000,
                            2250000,
                            2470000,
                            2580000,
                            2490000,
                            2610000,
                            2700000,
                            2810000,
                            2760000,
                            2880000,
                            2950000,
                            3010000,
                            3120000,
                            2980000
                        ],
                        "transactions": [
                            10,
                            12,
                            9,
                            14,
                            11,
                            13,
                            12,
                            15,
                            17,
                            18,
                            16,
                            13,
                            14,
                            16,
                            19,
                            18,
                            17,
                            15,
                            14,
                            16,
                            17,
                            16,
                            18,
                            19,
                            20,
                            19,
                            21,
                            22,
                            23,
                            24,
                            22
                        ]
                    }
                ],
                "meta": {
                    "from": "2026-07-01",
                    "to": "2026-07-31",
                    "total_sales": 76930000,
                    "total_transactions": 1382
                }
            },
            "year": {
                "period": "12m",
                "currency": "IRR",
                "labels": [
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec"
                ],
                "series": [
                    {
                        "sales": [
                            52000000,
                            48100000,
                            56300000,
                            59800000,
                            61200000,
                            64500000,
                            68700000,
                            65400000,
                            62100000,
                            67200000,
                            70400000,
                            73900000
                        ],
                        "transactions": [
                            1123,
                            1055,
                            1204,
                            1289,
                            1310,
                            1372,
                            1468,
                            1402,
                            1345,
                            1441,
                            1517,
                            1593
                        ]
                    }
                ],
                "meta": {
                    "from": "2025-08-01",
                    "to": "2026-07-31",
                    "total_sales": 776500000,
                    "total_transactions": 16921
                }
            }
        }
    },
    prices: {
        "vending_item_21": {
            "id": 1000,
            "channel": 21,
            "name": "کیک شکلاتی",
            "quantity": 0,
            "price": 0,
            "size": 0,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": false,
            "barcode": "",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_22": {
            "id": 1001,
            "channel": 22,
            "name": "بیسکویت مخصوص با روکش شکلاتی و مغز کرم فندقی ویژه جشنواره",
            "quantity": 4,
            "price": 18750,
            "size": 1,
            "gifts": [
                "0",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000022",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_23": {
            "id": 1002,
            "channel": 23,
            "name": "آب معدنی",
            "quantity": 7,
            "price": 22500,
            "size": 2,
            "gifts": [
                "1",
                "0",
                ""
            ],
            "visible": true,
            "barcode": "10000000000023",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_24": {
            "id": 1003,
            "channel": 24,
            "name": "پفک نمکی",
            "quantity": 10,
            "price": 26250,
            "size": 3,
            "gifts": [
                "2",
                "1",
                "0"
            ],
            "visible": true,
            "barcode": "10000000000024",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_25": {
            "id": 1004,
            "channel": 25,
            "name": "قهوه فوری",
            "quantity": 13,
            "price": 30000,
            "size": 0,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_26": {
            "id": 1005,
            "channel": 26,
            "name": "شکلات تلخ",
            "quantity": 16,
            "price": 33750,
            "size": 1,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000026",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_27": {
            "id": 1006,
            "channel": 27,
            "name": "کنسرو تن ماهی",
            "quantity": 19,
            "price": 37500,
            "size": 2,
            "gifts": [
                "5",
                "",
                ""
            ],
            "visible": false,
            "barcode": "10000000000027",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_28": {
            "id": 1007,
            "channel": 28,
            "name": "نمونه رایگان",
            "quantity": 500,
            "price": 41250,
            "size": 3,
            "gifts": [
                "6",
                "5",
                ""
            ],
            "visible": true,
            "barcode": "10000000000028",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_29": {
            "id": 1008,
            "channel": 29,
            "name": "بیسکویت کرمی",
            "quantity": 25,
            "price": 45000,
            "size": 0,
            "gifts": [
                "7",
                "6",
                "5"
            ],
            "visible": true,
            "barcode": "10000000000029",
            "disabledByServer": "vending_item_7",
            "error": "sensor_fault"
        },
        "vending_item_30": {
            "id": 1009,
            "channel": 30,
            "name": "بستنی چوبی",
            "quantity": 28,
            "price": 48750,
            "size": 1,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000030",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_31": {
            "id": 1010,
            "channel": 31,
            "name": "آدامس",
            "quantity": 0,
            "price": 52500,
            "size": 2,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000031",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_32": {
            "id": 1011,
            "channel": 32,
            "name": "چیپس سیب‌زمینی",
            "quantity": 4,
            "price": 56250,
            "size": 3,
            "gifts": [
                "10",
                "",
                ""
            ],
            "visible": true,
            "barcode": "",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_33": {
            "id": 1012,
            "channel": 33,
            "name": "آب نبات",
            "quantity": 7,
            "price": 60000,
            "size": 0,
            "gifts": [
                "11",
                "10",
                ""
            ],
            "visible": false,
            "barcode": "10000000000033",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_34": {
            "id": 1013,
            "channel": 34,
            "name": "چای کیسه‌ای",
            "quantity": 10,
            "price": 63750,
            "size": 1,
            "gifts": [
                "12",
                "11",
                "10"
            ],
            "visible": true,
            "barcode": "10000000000034",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_35": {
            "id": 1014,
            "channel": 35,
            "name": "نوشابه قوطی",
            "quantity": 500,
            "price": 67500,
            "size": 2,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000035",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_36": {
            "id": 1015,
            "channel": 36,
            "name": "ماست همراه",
            "quantity": 16,
            "price": 0,
            "size": 3,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000036",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_37": {
            "id": 1016,
            "channel": 37,
            "name": "کراکر",
            "quantity": 19,
            "price": 75000,
            "size": 0,
            "gifts": [
                "15",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000037",
            "disabledByServer": "vending_item_15",
            "error": "out_of_stock"
        },
        "vending_item_38": {
            "id": 1017,
            "channel": 38,
            "name": "پاستیل",
            "quantity": 22,
            "price": 78750,
            "size": 1,
            "gifts": [
                "16",
                "15",
                ""
            ],
            "visible": true,
            "barcode": "10000000000038",
            "disabledByServer": "",
            "error": "motor_jam"
        },
        "vending_item_39": {
            "id": 1018,
            "channel": 39,
            "name": "دونات",
            "quantity": 25,
            "price": 82500,
            "size": 2,
            "gifts": [
                "17",
                "16",
                "15"
            ],
            "visible": false,
            "barcode": "10000000000039",
            "disabledByServer": "",
            "error": "sensor_fault"
        },
        "vending_item_40": {
            "id": 1019,
            "channel": 40,
            "name": "ساندویچ سرد",
            "quantity": 28,
            "price": 86250,
            "size": 3,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000040",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_41": {
            "id": 1020,
            "channel": 41,
            "name": "کیک شکلاتی",
            "quantity": 0,
            "price": 90000,
            "size": 0,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000041",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_42": {
            "id": 1021,
            "channel": 42,
            "name": "کیک پرتقالی",
            "quantity": 500,
            "price": 93750,
            "size": 1,
            "gifts": [
                "20",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000042",
            "disabledByServer": "",
            "error": "out_of_stock"
        },
        "vending_item_43": {
            "id": 1022,
            "channel": 43,
            "name": "آب معدنی",
            "quantity": 7,
            "price": 97500,
            "size": 2,
            "gifts": [
                "21",
                "20",
                ""
            ],
            "visible": true,
            "barcode": "",
            "disabledByServer": "",
            "error": "motor_jam"
        },
        "vending_item_44": {
            "id": 1023,
            "channel": 44,
            "name": "پفک نمکی",
            "quantity": 10,
            "price": 101250,
            "size": 3,
            "gifts": [
                "22",
                "21",
                "20"
            ],
            "visible": true,
            "barcode": "10000000000044",
            "disabledByServer": "",
            "error": "sensor_fault"
        },
        "vending_item_45": {
            "id": 1024,
            "channel": 45,
            "name": "قهوه فوری",
            "quantity": 13,
            "price": 105000,
            "size": 0,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": false,
            "barcode": "10000000000045",
            "disabledByServer": "vending_item_23",
            "error": ""
        },
        "vending_item_46": {
            "id": 1025,
            "channel": 46,
            "name": "شکلات تلخ",
            "quantity": 16,
            "price": 108750,
            "size": 1,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000046",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_47": {
            "id": 1026,
            "channel": 47,
            "name": "کنسرو تن ماهی",
            "quantity": 19,
            "price": 112500,
            "size": 2,
            "gifts": [
                "25",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000047",
            "disabledByServer": "",
            "error": "out_of_stock"
        },
        "vending_item_48": {
            "id": 1027,
            "channel": 48,
            "name": "نمونه رایگان",
            "quantity": 22,
            "price": 116250,
            "size": 3,
            "gifts": [
                "26",
                "25",
                ""
            ],
            "visible": true,
            "barcode": "10000000000048",
            "disabledByServer": "",
            "error": "motor_jam"
        },
        "vending_item_49": {
            "id": 1028,
            "channel": 49,
            "name": "بیسکویت کرمی",
            "quantity": 500,
            "price": 120000,
            "size": 0,
            "gifts": [
                "27",
                "26",
                "25"
            ],
            "visible": true,
            "barcode": "10000000000049",
            "disabledByServer": "",
            "error": "sensor_fault"
        },
        "vending_item_50": {
            "id": 1029,
            "channel": 50,
            "name": "بستنی چوبی",
            "quantity": 28,
            "price": 123750,
            "size": 1,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000050",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_51": {
            "id": 1030,
            "channel": 51,
            "name": "آدامس",
            "quantity": 0,
            "price": 0,
            "size": 2,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": false,
            "barcode": "10000000000051",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_52": {
            "id": 1031,
            "channel": 52,
            "name": "چیپس سیب‌زمینی",
            "quantity": 4,
            "price": 131250,
            "size": 3,
            "gifts": [
                "30",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000052",
            "disabledByServer": "",
            "error": "out_of_stock"
        },
        "vending_item_53": {
            "id": 1032,
            "channel": 53,
            "name": "آب نبات",
            "quantity": 7,
            "price": 135000,
            "size": 0,
            "gifts": [
                "31",
                "30",
                ""
            ],
            "visible": true,
            "barcode": "10000000000053",
            "disabledByServer": "vending_item_31",
            "error": "motor_jam"
        },
        "vending_item_54": {
            "id": 1033,
            "channel": 54,
            "name": "چای کیسه‌ای",
            "quantity": 10,
            "price": 138750,
            "size": 1,
            "gifts": [
                "32",
                "31",
                "30"
            ],
            "visible": true,
            "barcode": "",
            "disabledByServer": "",
            "error": "sensor_fault"
        },
        "vending_item_55": {
            "id": 1034,
            "channel": 55,
            "name": "نوشابه قوطی",
            "quantity": 13,
            "price": 142500,
            "size": 2,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000055",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_56": {
            "id": 1035,
            "channel": 56,
            "name": "ماست همراه",
            "quantity": 500,
            "price": 146250,
            "size": 3,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000056",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_57": {
            "id": 1036,
            "channel": 57,
            "name": "کراکر",
            "quantity": 19,
            "price": 150000,
            "size": 0,
            "gifts": [
                "35",
                "",
                ""
            ],
            "visible": false,
            "barcode": "10000000000057",
            "disabledByServer": "",
            "error": "out_of_stock"
        },
        "vending_item_58": {
            "id": 1037,
            "channel": 58,
            "name": "پاستیل",
            "quantity": 22,
            "price": 153750,
            "size": 1,
            "gifts": [
                "36",
                "35",
                ""
            ],
            "visible": true,
            "barcode": "10000000000058",
            "disabledByServer": "",
            "error": "motor_jam"
        },
        "vending_item_59": {
            "id": 1038,
            "channel": 59,
            "name": "دونات",
            "quantity": 25,
            "price": 157500,
            "size": 2,
            "gifts": [
                "37",
                "36",
                "35"
            ],
            "visible": true,
            "barcode": "10000000000059",
            "disabledByServer": "",
            "error": "sensor_fault"
        },
        "vending_item_60": {
            "id": 1039,
            "channel": 60,
            "name": "ساندویچ سرد",
            "quantity": 28,
            "price": 161250,
            "size": 3,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000060",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_61": {
            "id": 1040,
            "channel": 61,
            "name": "کیک شکلاتی",
            "quantity": 0,
            "price": 165000,
            "size": 0,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000061",
            "disabledByServer": "vending_item_39",
            "error": ""
        },
        "vending_item_62": {
            "id": 1041,
            "channel": 62,
            "name": "کیک پرتقالی",
            "quantity": 4,
            "price": 168750,
            "size": 1,
            "gifts": [
                "40",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000062",
            "disabledByServer": "",
            "error": "out_of_stock"
        },
        "vending_item_63": {
            "id": 1042,
            "channel": 63,
            "name": "آب معدنی",
            "quantity": 500,
            "price": 172500,
            "size": 2,
            "gifts": [
                "41",
                "40",
                ""
            ],
            "visible": false,
            "barcode": "10000000000063",
            "disabledByServer": "",
            "error": "motor_jam"
        },
        "vending_item_64": {
            "id": 1043,
            "channel": 64,
            "name": "پفک نمکی",
            "quantity": 10,
            "price": 176250,
            "size": 3,
            "gifts": [
                "42",
                "41",
                "40"
            ],
            "visible": true,
            "barcode": "10000000000064",
            "disabledByServer": "",
            "error": "sensor_fault"
        },
        "vending_item_65": {
            "id": 1044,
            "channel": 65,
            "name": "قهوه فوری",
            "quantity": 13,
            "price": 180000,
            "size": 0,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_66": {
            "id": 1045,
            "channel": 66,
            "name": "شکلات تلخ",
            "quantity": 16,
            "price": 0,
            "size": 1,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000066",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_67": {
            "id": 1046,
            "channel": 67,
            "name": "کنسرو تن ماهی",
            "quantity": 19,
            "price": 187500,
            "size": 2,
            "gifts": [
                "45",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000067",
            "disabledByServer": "",
            "error": "out_of_stock"
        },
        "vending_item_68": {
            "id": 1047,
            "channel": 68,
            "name": "نمونه رایگان",
            "quantity": 22,
            "price": 191250,
            "size": 3,
            "gifts": [
                "46",
                "45",
                ""
            ],
            "visible": true,
            "barcode": "10000000000068",
            "disabledByServer": "",
            "error": "motor_jam"
        },
        "vending_item_69": {
            "id": 1048,
            "channel": 69,
            "name": "بیسکویت کرمی",
            "quantity": 25,
            "price": 195000,
            "size": 0,
            "gifts": [
                "47",
                "46",
                "45"
            ],
            "visible": false,
            "barcode": "10000000000069",
            "disabledByServer": "vending_item_47",
            "error": "sensor_fault"
        },
        "vending_item_70": {
            "id": 1049,
            "channel": 70,
            "name": "بستنی چوبی",
            "quantity": 500,
            "price": 198750,
            "size": 1,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000070",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_71": {
            "id": 1050,
            "channel": 71,
            "name": "آدامس",
            "quantity": 0,
            "price": 202500,
            "size": 2,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000071",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_72": {
            "id": 1051,
            "channel": 72,
            "name": "چیپس سیب‌زمینی",
            "quantity": 4,
            "price": 206250,
            "size": 3,
            "gifts": [
                "50",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000072",
            "disabledByServer": "",
            "error": "out_of_stock"
        },
        "vending_item_73": {
            "id": 1052,
            "channel": 73,
            "name": "آب نبات",
            "quantity": 7,
            "price": 210000,
            "size": 0,
            "gifts": [
                "51",
                "50",
                ""
            ],
            "visible": true,
            "barcode": "10000000000073",
            "disabledByServer": "",
            "error": "motor_jam"
        },
        "vending_item_74": {
            "id": 1053,
            "channel": 74,
            "name": "چای کیسه‌ای",
            "quantity": 10,
            "price": 213750,
            "size": 1,
            "gifts": [
                "52",
                "51",
                "50"
            ],
            "visible": true,
            "barcode": "10000000000074",
            "disabledByServer": "",
            "error": "sensor_fault"
        },
        "vending_item_75": {
            "id": 1054,
            "channel": 75,
            "name": "نوشابه قوطی",
            "quantity": 13,
            "price": 217500,
            "size": 2,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": false,
            "barcode": "10000000000075",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_76": {
            "id": 1055,
            "channel": 76,
            "name": "ماست همراه",
            "quantity": 16,
            "price": 221250,
            "size": 3,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "",
            "disabledByServer": "",
            "error": ""
        },
        "vending_item_77": {
            "id": 1056,
            "channel": 77,
            "name": "کراکر",
            "quantity": 500,
            "price": 225000,
            "size": 0,
            "gifts": [
                "55",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000077",
            "disabledByServer": "vending_item_55",
            "error": "out_of_stock"
        },
        "vending_item_78": {
            "id": 1057,
            "channel": 78,
            "name": "پاستیل",
            "quantity": 22,
            "price": 228750,
            "size": 1,
            "gifts": [
                "56",
                "55",
                ""
            ],
            "visible": true,
            "barcode": "10000000000078",
            "disabledByServer": "",
            "error": "motor_jam"
        },
        "vending_item_79": {
            "id": 1058,
            "channel": 79,
            "name": "دونات",
            "quantity": 25,
            "price": 232500,
            "size": 2,
            "gifts": [
                "57",
                "56",
                "55"
            ],
            "visible": true,
            "barcode": "10000000000079",
            "disabledByServer": "",
            "error": "sensor_fault"
        },
        "vending_item_80": {
            "id": 1059,
            "channel": 80,
            "name": "ساندویچ سرد",
            "quantity": 28,
            "price": 236250,
            "size": 3,
            "gifts": [
                "",
                "",
                ""
            ],
            "visible": true,
            "barcode": "10000000000080",
            "disabledByServer": "",
            "error": ""
        }
    },
    info: {
        SN: "ESP32-DEV-00123456",
        esp_version: "v2.4.1",
        stm_version: "v1.8.0",
        board_version: "Rev B",
        esp_chip: "ESP32-WROOM-32",
        stm_chip: "STM32F103C8T6",

        heap_used: "128 KB",
        heap_total: "320 KB",
        flash_used: "1.2 MB",
        flash_total: "4 MB",

        wifi: {
            wifi_sta_ssid: "MyHomeNetwork",
            wifi_sta_ip: "192.168.1.45",
            wifi_sta_connected: true,
            mac: "24:6F:28:AE:3B:9C",
            rssi: "-58 dBm",
            system_status: "آماده به کار",

            wifi_ap_ssid: "Device_AP_9C3B",
            wifi_ap_ip: "192.168.4.1",
            wifi_ap_connected_devices: 2
        },

        last_operation: {
            title: "به‌روزرسانی نرم‌افزار",
            time: "1404/04/31 - 14:22",
            status: "موفق"
        }
    },
    service_configuration: {
        payment: {
            coin_acceptor: "فعال",
            bill_acceptor: "غیرفعال",
            pos_terminal: "فعال",
            wallet_payment: "فعال",
        },
        auxiliary: {
            cooling_fan: "فعال",
            lighting_system: "فعال",
            temperature_sensor: "متصل",
            door_sensor: "بسته",
        },
        elevator: {
            elevator_enabled: "فعال",
            elevator_motor_status: "آماده",
            elevator_position: "طبقه 3",
            elevator_sensor: "سالم",
        },
    },
    clients: {
        "client_1": {
            name: "علی محمدی",
            id: 7070,
            status: "فعال"
        },
        "client_2": {
            name: "زهرا احمدی",
            id: 8085,
            status: "فعال"
        },
        "client_3": {
            name: "رضا کریمی",
            id: 9595,
            status: "غیر فعال"
        },
        "client_4": {
            name: "مریم حسینی",
            id: 6565,
            status: "غیر فعال"
        },
        "client_5": {
            name: "",
            id: 7575,
            status: "فعال"
        },
        "client_6": {
            name: "سینا رستمی",
            id: 8585,
            status: "فعال"
        },
    },
    balance: [
        {id: "1001", name: "علی رضایی", balance: 250000},
        {
            id: "1002",
            name: "مریم احمدی",
            balance: 120000,
        },
        {id: "1003", name: "حسین کریمی", balance: 980000},
        {
            id: "1004",
            name: "زهرا محمدی",
            balance: 430000,
        },
        {id: "1005", name: "رضا حسینی", balance: 760000},
    ],
    settings: {
        apSSID: "POS-Device-1234",
        adminUsername: "admin",
        posDevice: "SAMAN",
        currentDate: "2026-07-23",
        currentTime: "14:30"
    },
    factory: {
        // NETWORK
        dns1: "8.8.8.8",
        dns2: "8.8.4.4",
        use_static: false,
        static_ip: "192.168.1.100",
        static_gw: "192.168.1.1",
        static_sn: "255.255.255.0",

        // CORE
        serial: "SN-2026-000123",

        // MQTT
        mqtt_host: "mqtt.example.com",
        mqtt_port: 8883,
        mqtt_topic: "factory/devices/001",
        mqtt_auto: true,
        mqtt_cert: "",

        // OTA
        ota_primary: "https://ota.example.com/primary",
        ota_secondary: "https://ota.example.com/secondary",
        ota_version: "version.json",
        ota_bin: "firmware.bin",
        ota_auto: true,
        ota_cert: ""
    },
};
