# MySQL面试指南

## 1.基础

### 1.MySQL常用的存储引擎有什么？它们有什么区别？

**Table **Feature of different engine

|                           Feature                            |                            InnoDB                            |                            MyISAM                            |                          MEMORY                           |
| :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: | :-------------------------------------------------------: |
|                      **B-tree indexes**                      |                             Yes                              |                             Yes                              |                            Yes                            |
| **Backup/point-in-time recovery** (Implemented in the server, rather than in the storage engine.) |                             Yes                              |                             Yes                              |                            Yes                            |
|                 **Cluster database support**                 |                              No                              |                              No                              |                            No                             |
|                    **Clustered indexes**                     |                             Yes                              |                              No                              |                            No                             |
|                     **Compressed data**                      |                             Yes                              | Yes (Compressed MyISAM tables are supported only when using the compressed row format. Tables using the compressed row format with MyISAM are read only.) |                            No                             |
|                       **Data caches**                        |                             Yes                              |                              No                              |                            N/A                            |
|                      **Encrypted data**                      | Yes (Implemented in the server via encryption functions; In MySQL 5.7 and later, data-at-rest encryption is supported.) |  Yes (Implemented in the server via encryption functions.)   | Yes (Implemented in the server via encryption functions.) |
|                   **Foreign key support**                    |                             Yes                              |                              No                              |                            No                             |
|                 **Full-text search indexes**                 | Yes (Support for FULLTEXT indexes is available in MySQL 5.6 and later.) |                             Yes                              |                            No                             |
|               **Geospatial data type support**               |                             Yes                              |                             Yes                              |                            No                             |
|               **Geospatial indexing support**                | Yes (Support for geospatial indexing is available in MySQL 5.7 and later.) |                             Yes                              |                            No                             |
|                       **Hash indexes**                       | No (InnoDB utilizes hash indexes internally for its Adaptive Hash Index feature.) |                              No                              |                            Yes                            |
|                       **Index caches**                       |                             Yes                              |                             Yes                              |                            N/A                            |
|                   **Locking granularity**                    |                             Row                              |                            Table                             |                           Table                           |
|                           **MVCC**                           |                             Yes                              |                              No                              |                            No                             |
| **Replication support** (Implemented in the server, rather than in the storage engine.) |                             Yes                              |                             Yes                              |    Limited (See the discussion later in this section.)    |
|                      **Storage limits**                      |                             64TB                             |                            256TB                             |                            RAM                            |
|                      **T-tree indexes**                      |                              No                              |                              No                              |                            No                             |
|                       **Transactions**                       |                             Yes                              |                              No                              |                            No                             |
|          **Update statistics for data dictionary**           |                             Yes                              |                             Yes                              |                            Yes                            |

### 2.数据库的三大范式　

- 第一范式：确保每列保持原子性，[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)表中的所有字段值都是不可分解的原子值。
- 第二范式：确保表中的每列都和主键相关
- 第三范式：确保每列都和主键列直接相关而不是间接相关

### 3.MySQL的[数据](https://www.nowcoder.com/jump/super-jump/word?word=数据)类型有哪些　

#### 3.1 数字

- [`BIT[(*`M`*)\]`](https://dev.mysql.com/doc/refman/8.0/en/bit-type.html)

  A bit-value type. *`M`* indicates the number of bits per value, from 1 to 64. The default is 1 if *`M`* is omitted.

- [`TINYINT[(*`M`*)\] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)

  A very small integer. The signed range is `-128` to `127`. The unsigned range is `0` to `255`.

- [`BOOL`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html), [`BOOLEAN`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)

  These types are synonyms for [`TINYINT(1)`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html). A value of zero is considered false. Nonzero values are considered true:

  ```sql
  mysql> SELECT IF(0, 'true', 'false');
  +------------------------+
  | IF(0, 'true', 'false') |
  +------------------------+
  | false                  |
  +------------------------+
  
  mysql> SELECT IF(1, 'true', 'false');
  +------------------------+
  | IF(1, 'true', 'false') |
  +------------------------+
  | true                   |
  +------------------------+
  
  mysql> SELECT IF(2, 'true', 'false');
  +------------------------+
  | IF(2, 'true', 'false') |
  +------------------------+
  | true                   |
  +------------------------+
  ```

  However, the values `TRUE` and `FALSE` are merely aliases for `1` and `0`, respectively, as shown here:

  ```sql
  mysql> SELECT IF(0 = FALSE, 'true', 'false');
  +--------------------------------+
  | IF(0 = FALSE, 'true', 'false') |
  +--------------------------------+
  | true                           |
  +--------------------------------+
  
  mysql> SELECT IF(1 = TRUE, 'true', 'false');
  +-------------------------------+
  | IF(1 = TRUE, 'true', 'false') |
  +-------------------------------+
  | true                          |
  +-------------------------------+
  
  mysql> SELECT IF(2 = TRUE, 'true', 'false');
  +-------------------------------+
  | IF(2 = TRUE, 'true', 'false') |
  +-------------------------------+
  | false                         |
  +-------------------------------+
  
  mysql> SELECT IF(2 = FALSE, 'true', 'false');
  +--------------------------------+
  | IF(2 = FALSE, 'true', 'false') |
  +--------------------------------+
  | false                          |
  +--------------------------------+
  ```

  The last two statements display the results shown because `2` is equal to neither `1` nor `0`.

- [`SMALLINT[(*`M`*)\] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)

  A small integer. The signed range is `-32768` to `32767`. The unsigned range is `0` to `65535`.

- [`MEDIUMINT[(*`M`*)\] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)

  A medium-sized integer. The signed range is `-8388608` to `8388607`. The unsigned range is `0` to `16777215`.

- [`INT[(*`M`*)\] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)

  A normal-size integer. The signed range is `-2147483648` to `2147483647`. The unsigned range is `0` to `4294967295`.

- [`INTEGER[(*`M`*)\] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)

  This type is a synonym for [`INT`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html).

- [`BIGINT[(*`M`*)\] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html)

  A large integer. The signed range is `-9223372036854775808` to `9223372036854775807`. The unsigned range is `0` to `18446744073709551615`.

  `SERIAL` is an alias for `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE`.

  Some things you should be aware of with respect to [`BIGINT`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html) columns:

  - All arithmetic is done using signed [`BIGINT`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html) or [`DOUBLE`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) values, so you should not use unsigned big integers larger than `9223372036854775807` (63 bits) except with bit functions! If you do that, some of the last digits in the result may be wrong because of rounding errors when converting a [`BIGINT`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html) value to a [`DOUBLE`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html).

    MySQL can handle [`BIGINT`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html) in the following cases:

    - When using integers to store large unsigned values in a [`BIGINT`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html) column.
    - In [`MIN(*`col_name`*)`](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_min) or [`MAX(*`col_name`*)`](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_max), where *`col_name`* refers to a [`BIGINT`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html) column.
    - When using operators ([`+`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_plus), [`-`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus), [`*`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_times), and so on) where both operands are integers.

  - You can always store an exact integer value in a [`BIGINT`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html) column by storing it using a string. In this case, MySQL performs a string-to-number conversion that involves no intermediate double-precision representation.

  - The [`-`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_minus), [`+`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_plus), and [`*`](https://dev.mysql.com/doc/refman/8.0/en/arithmetic-functions.html#operator_times) operators use [`BIGINT`](https://dev.mysql.com/doc/refman/8.0/en/integer-types.html) arithmetic when both operands are integer values. This means that if you multiply two big integers (or results from functions that return integers), you may get unexpected results when the result is larger than `9223372036854775807`.

- [`DECIMAL[(*`M`*[,*`D`*\])] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html)

  A packed “exact” fixed-point number. *`M`* is the total number of digits (the precision) and *`D`* is the number of digits after the decimal point (the scale). The decimal point and (for negative numbers) the `-` sign are not counted in *`M`*. If *`D`* is 0, values have no decimal point or fractional part. The maximum number of digits (*`M`*) for [`DECIMAL`](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html) is 65. The maximum number of supported decimals (*`D`*) is 30. If *`D`* is omitted, the default is 0. If *`M`* is omitted, the default is 10. (There is also a limit on how long the text of [`DECIMAL`](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html) literals can be; see [Section 12.25.3, “Expression Handling”](https://dev.mysql.com/doc/refman/8.0/en/precision-math-expressions.html).)

  `UNSIGNED`, if specified, disallows negative values. As of MySQL 8.0.17, the `UNSIGNED` attribute is deprecated for columns of type [`DECIMAL`](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html) (and any synonyms); you should expect support for it to be removed in a future version of MySQL. Consider using a simple `CHECK` constraint instead for such columns.

  All basic calculations (`+, -, *, /`) with [`DECIMAL`](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html) columns are done with a precision of 65 digits.

- [`DEC[(*`M`*[,*`D`*\])] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html), [`NUMERIC[(*`M`*[,*`D`*\])] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html), [`FIXED[(*`M`*[,*`D`*\])] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html)

  These types are synonyms for [`DECIMAL`](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html). The [`FIXED`](https://dev.mysql.com/doc/refman/8.0/en/fixed-point-types.html) synonym is available for compatibility with other database systems.

- [`FLOAT[(*`M`*,*`D`*)\] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html)

  A small (single-precision) floating-point number. Permissible values are `-3.402823466E+38` to `-1.175494351E-38`, `0`, and `1.175494351E-38` to `3.402823466E+38`. These are the theoretical limits, based on the IEEE standard. The actual range might be slightly smaller depending on your hardware or operating system.

  *`M`* is the total number of digits and *`D`* is the number of digits following the decimal point. If *`M`* and *`D`* are omitted, values are stored to the limits permitted by the hardware. A single-precision floating-point number is accurate to approximately 7 decimal places.

  `FLOAT(*`M`*,*`D`*)` is a nonstandard MySQL extension. As of MySQL 8.0.17, this syntax is deprecated, and you should expect support for it to be removed in a future version of MySQL.

  `UNSIGNED`, if specified, disallows negative values. As of MySQL 8.0.17, the `UNSIGNED` attribute is deprecated for columns of type [`FLOAT`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) (and any synonyms) and you should expect support for it to be removed in a future version of MySQL. Consider using a simple `CHECK` constraint instead for such columns.

  Using [`FLOAT`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) might give you some unexpected problems because all calculations in MySQL are done with double precision. See [Section B.3.4.7, “Solving Problems with No Matching Rows”](https://dev.mysql.com/doc/refman/8.0/en/no-matching-rows.html).

- [`FLOAT(*`p`*) [UNSIGNED\] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html)

  A floating-point number. *`p`* represents the precision in bits, but MySQL uses this value only to determine whether to use [`FLOAT`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) or [`DOUBLE`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) for the resulting data type. If *`p`* is from 0 to 24, the data type becomes [`FLOAT`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) with no *`M`* or *`D`* values. If *`p`* is from 25 to 53, the data type becomes [`DOUBLE`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) with no *`M`* or *`D`* values. The range of the resulting column is the same as for the single-precision [`FLOAT`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) or double-precision [`DOUBLE`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) data types described earlier in this section.

  `UNSIGNED`, if specified, disallows negative values. As of MySQL 8.0.17, the `UNSIGNED` attribute is deprecated for columns of type [`FLOAT`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) (and any synonyms) and you should expect support for it to be removed in a future version of MySQL. Consider using a simple `CHECK` constraint instead for such columns.

  [`FLOAT(*`p`*)`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) syntax is provided for ODBC compatibility.

- [`DOUBLE[(*`M`*,*`D`*)\] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html)

  A normal-size (double-precision) floating-point number. Permissible values are `-1.7976931348623157E+308` to `-2.2250738585072014E-308`, `0`, and `2.2250738585072014E-308` to `1.7976931348623157E+308`. These are the theoretical limits, based on the IEEE standard. The actual range might be slightly smaller depending on your hardware or operating system.

  *`M`* is the total number of digits and *`D`* is the number of digits following the decimal point. If *`M`* and *`D`* are omitted, values are stored to the limits permitted by the hardware. A double-precision floating-point number is accurate to approximately 15 decimal places.

  `DOUBLE(*`M`*,*`D`*)` is a nonstandard MySQL extension. As of MySQL 8.0.17, this syntax is deprecated and you should expect support for it to be removed in a future version of MySQL.

  `UNSIGNED`, if specified, disallows negative values. As of MySQL 8.0.17, the `UNSIGNED` attribute is deprecated for columns of type [`DOUBLE`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) (and any synonyms) and you should expect support for it to be removed in a future version of MySQL. Consider using a simple `CHECK` constraint instead for such columns.

- [`DOUBLE PRECISION[(*`M`*,*`D`*)\] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html), [`REAL[(*`M`*,*`D`*)\] [UNSIGNED] [ZEROFILL]`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html)

  These types are synonyms for [`DOUBLE`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html). Exception: If the [`REAL_AS_FLOAT`](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sqlmode_real_as_float) SQL mode is enabled, [`REAL`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) is a synonym for [`FLOAT`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html) rather than [`DOUBLE`](https://dev.mysql.com/doc/refman/8.0/en/floating-point-types.html).

  

#### 3.2日期

The date and time data types for representing temporal values are [`DATE`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html), [`TIME`](https://dev.mysql.com/doc/refman/8.0/en/time.html), [`DATETIME`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html), [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html), and [`YEAR`](https://dev.mysql.com/doc/refman/8.0/en/year.html).

For the [`DATE`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) and [`DATETIME`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) range descriptions, “supported” means that although earlier values might work, there is no guarantee.



MySQL permits fractional seconds for [`TIME`](https://dev.mysql.com/doc/refman/8.0/en/time.html), [`DATETIME`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html), and [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) values, with up to microseconds (6 digits) precision. To define a column that includes a fractional seconds part, use the syntax `*`type_name`*(*`fsp`*)`, where *`type_name`* is [`TIME`](https://dev.mysql.com/doc/refman/8.0/en/time.html), [`DATETIME`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html), or [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html), and *`fsp`* is the fractional seconds precision. For example:

```sql
CREATE TABLE t1 (t TIME(3), dt DATETIME(6), ts TIMESTAMP(0));
```

The *`fsp`* value, if given, must be in the range 0 to 6. A value of 0 signifies that there is no fractional part. If omitted, the default precision is 0. (This differs from the standard SQL default of 6, for compatibility with previous MySQL versions.)

Any [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) or [`DATETIME`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) column in a table can have automatic initialization and updating properties; see [Section 11.2.5, “Automatic Initialization and Updating for TIMESTAMP and DATETIME”](https://dev.mysql.com/doc/refman/8.0/en/timestamp-initialization.html).

- [`DATE`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html)

  A date. The supported range is `'1000-01-01'` to `'9999-12-31'`. MySQL displays [`DATE`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) values in `'*`YYYY-MM-DD`*'` format, but permits assignment of values to [`DATE`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) columns using either strings or numbers.

- [`DATETIME[(*`fsp`*)\]`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html)

  A date and time combination. The supported range is `'1000-01-01 00:00:00.000000'` to `'9999-12-31 23:59:59.999999'`. MySQL displays [`DATETIME`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) values in `'*`YYYY-MM-DD hh:mm:ss`*[.*`fraction`*]'` format, but permits assignment of values to [`DATETIME`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) columns using either strings or numbers.

  An optional *`fsp`* value in the range from 0 to 6 may be given to specify fractional seconds precision. A value of 0 signifies that there is no fractional part. If omitted, the default precision is 0.

  Automatic initialization and updating to the current date and time for [`DATETIME`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) columns can be specified using `DEFAULT` and `ON UPDATE` column definition clauses, as described in [Section 11.2.5, “Automatic Initialization and Updating for TIMESTAMP and DATETIME”](https://dev.mysql.com/doc/refman/8.0/en/timestamp-initialization.html).

- [`TIMESTAMP[(*`fsp`*)\]`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html)

  

  A timestamp. The range is `'1970-01-01 00:00:01.000000'` UTC to `'2038-01-19 03:14:07.999999'` UTC. [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) values are stored as the number of seconds since the epoch (`'1970-01-01 00:00:00'` UTC). A [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) cannot represent the value `'1970-01-01 00:00:00'` because that is equivalent to 0 seconds from the epoch and the value 0 is reserved for representing `'0000-00-00 00:00:00'`, the “zero” [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) value.

  An optional *`fsp`* value in the range from 0 to 6 may be given to specify fractional seconds precision. A value of 0 signifies that there is no fractional part. If omitted, the default precision is 0.

  The way the server handles `TIMESTAMP` definitions depends on the value of the [`explicit_defaults_for_timestamp`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp) system variable (see [Section 5.1.8, “Server System Variables”](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html)).

  If [`explicit_defaults_for_timestamp`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp) is enabled, there is no automatic assignment of the `DEFAULT CURRENT_TIMESTAMP` or `ON UPDATE CURRENT_TIMESTAMP` attributes to any [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) column. They must be included explicitly in the column definition. Also, any [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) not explicitly declared as `NOT NULL` permits `NULL` values.

  If [`explicit_defaults_for_timestamp`](https://dev.mysql.com/doc/refman/8.0/en/server-system-variables.html#sysvar_explicit_defaults_for_timestamp) is disabled, the server handles `TIMESTAMP` as follows:

  Unless specified otherwise, the first [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) column in a table is defined to be automatically set to the date and time of the most recent modification if not explicitly assigned a value. This makes [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) useful for recording the timestamp of an [`INSERT`](https://dev.mysql.com/doc/refman/8.0/en/insert.html) or [`UPDATE`](https://dev.mysql.com/doc/refman/8.0/en/update.html) operation. You can also set any [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) column to the current date and time by assigning it a `NULL` value, unless it has been defined with the `NULL` attribute to permit `NULL` values.

  Automatic initialization and updating to the current date and time can be specified using `DEFAULT CURRENT_TIMESTAMP` and `ON UPDATE CURRENT_TIMESTAMP` column definition clauses. By default, the first [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) column has these properties, as previously noted. However, any [`TIMESTAMP`](https://dev.mysql.com/doc/refman/8.0/en/datetime.html) column in a table can be defined to have these properties.

- [`TIME[(*`fsp`*)\]`](https://dev.mysql.com/doc/refman/8.0/en/time.html)

  A time. The range is `'-838:59:59.000000'` to `'838:59:59.000000'`. MySQL displays [`TIME`](https://dev.mysql.com/doc/refman/8.0/en/time.html) values in `'*`hh:mm:ss`*[.*`fraction`*]'` format, but permits assignment of values to [`TIME`](https://dev.mysql.com/doc/refman/8.0/en/time.html) columns using either strings or numbers.

  An optional *`fsp`* value in the range from 0 to 6 may be given to specify fractional seconds precision. A value of 0 signifies that there is no fractional part. If omitted, the default precision is 0.

- [`YEAR[(4)\]`](https://dev.mysql.com/doc/refman/8.0/en/year.html)

  A year in 4-digit format. MySQL displays [`YEAR`](https://dev.mysql.com/doc/refman/8.0/en/year.html) values in *`YYYY`* format, but permits assignment of values to [`YEAR`](https://dev.mysql.com/doc/refman/8.0/en/year.html) columns using either strings or numbers. Values display as `1901` to `2155`, or `0000`.

  For additional information about [`YEAR`](https://dev.mysql.com/doc/refman/8.0/en/year.html) display format and interpretation of input values, see [Section 11.2.4, “The YEAR Type”](https://dev.mysql.com/doc/refman/8.0/en/year.html).

  Note

  As of MySQL 8.0.19, the [`YEAR(4)`](https://dev.mysql.com/doc/refman/8.0/en/year.html) data type with an explicit display width is deprecated; you should expect support for it to be removed in a future version of MySQL. Instead, use [`YEAR`](https://dev.mysql.com/doc/refman/8.0/en/year.html) without a display width, which has the same meaning.

  MySQL 8.0 does not support the 2-digit [`YEAR(2)`](https://dev.mysql.com/doc/refman/8.0/en/year.html) data type permitted in older versions of MySQL. For instructions on converting to 4-digit [`YEAR`](https://dev.mysql.com/doc/refman/8.0/en/year.html), see [2-Digit YEAR(2) Limitations and Migrating to 4-Digit YEAR](https://dev.mysql.com/doc/refman/5.7/en/migrating-from-year2.html), in [MySQL 5.7 Reference Manual](https://dev.mysql.com/doc/refman/5.7/en/).

The [`SUM()`](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_sum) and [`AVG()`](https://dev.mysql.com/doc/refman/8.0/en/aggregate-functions.html#function_avg) aggregate functions do not work with temporal values. (They convert the values to numbers, losing everything after the first nonnumeric character.) To work around this problem, convert to numeric units, perform the aggregate operation, and convert back to a temporal value. Examples:

#### 3.3字符串

The string data types are [`CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html), [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html), [`BINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html), [`VARBINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html), [`BLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html), [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html), [`ENUM`](https://dev.mysql.com/doc/refman/8.0/en/enum.html), and [`SET`](https://dev.mysql.com/doc/refman/8.0/en/set.html).

In some cases, MySQL may change a string column to a type different from that given in a [`CREATE TABLE`](https://dev.mysql.com/doc/refman/8.0/en/create-table.html) or [`ALTER TABLE`](https://dev.mysql.com/doc/refman/8.0/en/alter-table.html) statement. See [Section 13.1.20.7, “Silent Column Specification Changes”](https://dev.mysql.com/doc/refman/8.0/en/silent-column-changes.html).

For definitions of character string columns ([`CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html), [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html), and the [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) types), MySQL interprets length specifications in character units. For definitions of binary string columns ([`BINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html), [`VARBINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html), and the [`BLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) types), MySQL interprets length specifications in byte units.

Column definitions for character string data types [`CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html), [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html), the [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) types, [`ENUM`](https://dev.mysql.com/doc/refman/8.0/en/enum.html), [`SET`](https://dev.mysql.com/doc/refman/8.0/en/set.html), and any synonyms) can specify the column character set and collation:

- `CHARACTER SET` specifies the character set. If desired, a collation for the character set can be specified with the `COLLATE` attribute, along with any other attributes. For example:

  ```sql
  CREATE TABLE t
  (
      c1 VARCHAR(20) CHARACTER SET utf8mb4,
      c2 TEXT CHARACTER SET latin1 COLLATE latin1_general_cs
  );
  ```

  This table definition creates a column named `c1` that has a character set of `utf8mb4` with the default collation for that character set, and a column named `c2` that has a character set of `latin1` and a case-sensitive (`_cs`) collation.

  The rules for assigning the character set and collation when either or both of `CHARACTER SET` and the `COLLATE` attribute are missing are described in [Section 10.3.5, “Column Character Set and Collation”](https://dev.mysql.com/doc/refman/8.0/en/charset-column.html).

  `CHARSET` is a synonym for `CHARACTER SET`.

- Specifying the `CHARACTER SET binary` attribute for a character string data type causes the column to be created as the corresponding binary string data type: [`CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) becomes [`BINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html), [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) becomes [`VARBINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html), and [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) becomes [`BLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html). For the [`ENUM`](https://dev.mysql.com/doc/refman/8.0/en/enum.html) and [`SET`](https://dev.mysql.com/doc/refman/8.0/en/set.html) data types, this does not occur; they are created as declared. Suppose that you specify a table using this definition:

  ```sql
  CREATE TABLE t
  (
    c1 VARCHAR(10) CHARACTER SET binary,
    c2 TEXT CHARACTER SET binary,
    c3 ENUM('a','b','c') CHARACTER SET binary
  );
  ```

  The resulting table has this definition:

  ```sql
  CREATE TABLE t
  (
    c1 VARBINARY(10),
    c2 BLOB,
    c3 ENUM('a','b','c') CHARACTER SET binary
  );
  ```

- The `BINARY` attribute is a nonstandard MySQL extension that is shorthand for specifying the binary (`_bin`) collation of the column character set (or of the table default character set if no column character set is specified). In this case, comparison and sorting are based on numeric character code values. Suppose that you specify a table using this definition:

  ```sql
  CREATE TABLE t
  (
    c1 VARCHAR(10) CHARACTER SET latin1 BINARY,
    c2 TEXT BINARY
  ) CHARACTER SET utf8mb4;
  ```

  The resulting table has this definition:

  ```sql
  CREATE TABLE t (
    c1 VARCHAR(10) CHARACTER SET latin1 COLLATE latin1_bin,
    c2 TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
  ) CHARACTER SET utf8mb4;
  ```

  In MySQL 8.0, this nonstandard use of the `BINARY` attribute is ambiguous because the `utf8mb4` character set has multiple `_bin` collations. As of MySQL 8.0.17, the `BINARY` attribute is deprecated and you should expect support for it to be removed in a future version of MySQL. Applications should be adjusted to use an explicit `_bin` collation instead.

  The use of `BINARY` to specify a data type or character set remains unchanged.

- The `ASCII` attribute is shorthand for `CHARACTER SET latin1`. Supported in older MySQL releases, `ASCII` is deprecated in MySQL 8.0.28 and later; use `CHARACTER SET` instead.

- The `UNICODE` attribute is shorthand for `CHARACTER SET ucs2`. Supported in older MySQL releases, `UNICODE` is deprecated in MySQL 8.0.28 and later; use `CHARACTER SET` instead.

Character column comparison and sorting are based on the collation assigned to the column. For the [`CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html), [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html), [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html), [`ENUM`](https://dev.mysql.com/doc/refman/8.0/en/enum.html), and [`SET`](https://dev.mysql.com/doc/refman/8.0/en/set.html) data types, you can declare a column with a binary (`_bin`) collation or the `BINARY` attribute to cause comparison and sorting to use the underlying character code values rather than a lexical ordering.

For additional information about use of character sets in MySQL, see [Chapter 10, *Character Sets, Collations, Unicode*](https://dev.mysql.com/doc/refman/8.0/en/charset.html).

- `[NATIONAL] CHAR[(*`M`*)] [CHARACTER SET *`charset_name`*] [COLLATE *`collation_name`*]`

  A fixed-length string that is always right-padded with spaces to the specified length when stored. *`M`* represents the column length in characters. The range of *`M`* is 0 to 255. If *`M`* is omitted, the length is 1.

  

  Note

  Trailing spaces are removed when [`CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) values are retrieved unless the [`PAD_CHAR_TO_FULL_LENGTH`](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sqlmode_pad_char_to_full_length) SQL mode is enabled.

  [`CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) is shorthand for [`CHARACTER`](https://dev.mysql.com/doc/refman/8.0/en/char.html). [`NATIONAL CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) (or its equivalent short form, [`NCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html)) is the standard SQL way to define that a [`CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) column should use some predefined character set. MySQL uses `utf8mb3` as this predefined character set. [Section 10.3.7, “The National Character Set”](https://dev.mysql.com/doc/refman/8.0/en/charset-national.html).

  The [`CHAR BYTE`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html) data type is an alias for the [`BINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html) data type. This is a compatibility feature.

  MySQL permits you to create a column of type `CHAR(0)`. This is useful primarily when you must be compliant with old applications that depend on the existence of a column but that do not actually use its value. `CHAR(0)` is also quite nice when you need a column that can take only two values: A column that is defined as `CHAR(0) NULL` occupies only one bit and can take only the values `NULL` and `''` (the empty string).

- `[NATIONAL] VARCHAR(*`M`*) [CHARACTER SET *`charset_name`*] [COLLATE *`collation_name`*]`

  

  A variable-length string. *`M`* represents the maximum column length in characters. The range of *`M`* is 0 to 65,535. The effective maximum length of a [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) is subject to the maximum row size (65,535 bytes, which is shared among all columns) and the character set used. For example, `utf8mb3` characters can require up to three bytes per character, so a [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) column that uses the `utf8mb3` character set can be declared to be a maximum of 21,844 characters. See [Section 8.4.7, “Limits on Table Column Count and Row Size”](https://dev.mysql.com/doc/refman/8.0/en/column-count-limit.html).

  MySQL stores [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) values as a 1-byte or 2-byte length prefix plus data. The length prefix indicates the number of bytes in the value. A [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) column uses one length byte if values require no more than 255 bytes, two length bytes if values may require more than 255 bytes.

  Note

  MySQL follows the standard SQL specification, and does *not* remove trailing spaces from [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) values.

  [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) is shorthand for [`CHARACTER VARYING`](https://dev.mysql.com/doc/refman/8.0/en/char.html). [`NATIONAL VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) is the standard SQL way to define that a [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) column should use some predefined character set. MySQL uses `utf8mb3` as this predefined character set. [Section 10.3.7, “The National Character Set”](https://dev.mysql.com/doc/refman/8.0/en/charset-national.html). [`NVARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) is shorthand for [`NATIONAL VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html).

- [`BINARY[(*`M`*)\]`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html)

  The [`BINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html) type is similar to the [`CHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) type, but stores binary byte strings rather than nonbinary character strings. An optional length *`M`* represents the column length in bytes. If omitted, *`M`* defaults to 1.

- [`VARBINARY(*`M`*)`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html)

  The [`VARBINARY`](https://dev.mysql.com/doc/refman/8.0/en/binary-varbinary.html) type is similar to the [`VARCHAR`](https://dev.mysql.com/doc/refman/8.0/en/char.html) type, but stores binary byte strings rather than nonbinary character strings. *`M`* represents the maximum column length in bytes.

- [`TINYBLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html)

  A [`BLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) column with a maximum length of 255 (28 − 1) bytes. Each [`TINYBLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) value is stored using a 1-byte length prefix that indicates the number of bytes in the value.

- [`TINYTEXT [CHARACTER SET *`charset_name`*\] [COLLATE *`collation_name`*]`](https://dev.mysql.com/doc/refman/8.0/en/blob.html)

  A [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) column with a maximum length of 255 (28 − 1) characters. The effective maximum length is less if the value contains multibyte characters. Each [`TINYTEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) value is stored using a 1-byte length prefix that indicates the number of bytes in the value.

- [`BLOB[(*`M`*)\]`](https://dev.mysql.com/doc/refman/8.0/en/blob.html)

  A [`BLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) column with a maximum length of 65,535 (216 − 1) bytes. Each [`BLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) value is stored using a 2-byte length prefix that indicates the number of bytes in the value.

  An optional length *`M`* can be given for this type. If this is done, MySQL creates the column as the smallest [`BLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) type large enough to hold values *`M`* bytes long.

- [`TEXT[(*`M`*)\] [CHARACTER SET *`charset_name`*] [COLLATE *`collation_name`*]`](https://dev.mysql.com/doc/refman/8.0/en/blob.html)

  A [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) column with a maximum length of 65,535 (216 − 1) characters. The effective maximum length is less if the value contains multibyte characters. Each [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) value is stored using a 2-byte length prefix that indicates the number of bytes in the value.

  An optional length *`M`* can be given for this type. If this is done, MySQL creates the column as the smallest [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) type large enough to hold values *`M`* characters long.

- [`MEDIUMBLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html)

  A [`BLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) column with a maximum length of 16,777,215 (224 − 1) bytes. Each [`MEDIUMBLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) value is stored using a 3-byte length prefix that indicates the number of bytes in the value.

- [`MEDIUMTEXT [CHARACTER SET *`charset_name`*\] [COLLATE *`collation_name`*]`](https://dev.mysql.com/doc/refman/8.0/en/blob.html)

  A [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) column with a maximum length of 16,777,215 (224 − 1) characters. The effective maximum length is less if the value contains multibyte characters. Each [`MEDIUMTEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) value is stored using a 3-byte length prefix that indicates the number of bytes in the value.

- [`LONGBLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html)

  A [`BLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) column with a maximum length of 4,294,967,295 or 4GB (232 − 1) bytes. The effective maximum length of [`LONGBLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) columns depends on the configured maximum packet size in the client/server protocol and available memory. Each [`LONGBLOB`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) value is stored using a 4-byte length prefix that indicates the number of bytes in the value.

- [`LONGTEXT [CHARACTER SET *`charset_name`*\] [COLLATE *`collation_name`*]`](https://dev.mysql.com/doc/refman/8.0/en/blob.html)

  A [`TEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) column with a maximum length of 4,294,967,295 or 4GB (232 − 1) characters. The effective maximum length is less if the value contains multibyte characters. The effective maximum length of [`LONGTEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) columns also depends on the configured maximum packet size in the client/server protocol and available memory. Each [`LONGTEXT`](https://dev.mysql.com/doc/refman/8.0/en/blob.html) value is stored using a 4-byte length prefix that indicates the number of bytes in the value.

- [`ENUM('*`value1`*','*`value2`*',...) [CHARACTER SET *`charset_name`*\] [COLLATE *`collation_name`*]`](https://dev.mysql.com/doc/refman/8.0/en/enum.html)

  An enumeration. A string object that can have only one value, chosen from the list of values `'*`value1`*'`, `'*`value2`*'`, `...`, `NULL` or the special `''` error value. [`ENUM`](https://dev.mysql.com/doc/refman/8.0/en/enum.html) values are represented internally as integers.

  An [`ENUM`](https://dev.mysql.com/doc/refman/8.0/en/enum.html) column can have a maximum of 65,535 distinct elements.

  The maximum supported length of an individual `ENUM` element is *`M`* <= 255 and (*`M`* x *`w`*) <= 1020, where `M` is the element literal length and *`w`* is the number of bytes required for the maximum-length character in the character set.

- [`SET('*`value1`*','*`value2`*',...) [CHARACTER SET *`charset_name`*\] [COLLATE *`collation_name`*]`](https://dev.mysql.com/doc/refman/8.0/en/set.html)

  A set. A string object that can have zero or more values, each of which must be chosen from the list of values `'*`value1`*'`, `'*`value2`*'`, `...` [`SET`](https://dev.mysql.com/doc/refman/8.0/en/set.html) values are represented internally as integers.

  A [`SET`](https://dev.mysql.com/doc/refman/8.0/en/set.html) column can have a maximum of 64 distinct members.

  The maximum supported length of an individual `SET` element is *`M`* <= 255 and (*`M`* x *`w`*) <= 1020, where `M` is the element literal length and *`w`* is the number of bytes required for the maximum-length character in the character set.

#### 3.4其他

MySQL has spatial data types that correspond to OpenGIS classes. The basis for these types is described in [Section 11.4.2, “The OpenGIS Geometry Model”](https://dev.mysql.com/doc/refman/8.0/en/opengis-geometry-model.html).

Some spatial data types hold single geometry values:

- `GEOMETRY`
- `POINT`
- `LINESTRING`
- `POLYGON`

`GEOMETRY` can store geometry values of any type. The other single-value types (`POINT`, `LINESTRING`, and `POLYGON`) restrict their values to a particular geometry type.

The other spatial data types hold collections of values:

- `MULTIPOINT`
- `MULTILINESTRING`
- `MULTIPOLYGON`
- `GEOMETRYCOLLECTION`

`GEOMETRYCOLLECTION` can store a collection of objects of any type. The other collection types (`MULTIPOINT`, `MULTILINESTRING`, and `MULTIPOLYGON`) restrict collection members to those having a particular geometry type.

Example: To create a table named `geom` that has a column named `g` that can store values of any geometry type, use this statement:

```sql
CREATE TABLE geom (g GEOMETRY);
```

Columns with a spatial data type can have an `SRID` attribute, to explicitly indicate the spatial reference system (SRS) for values stored in the column. For example:

```sql
CREATE TABLE geom (
    p POINT SRID 0,
    g GEOMETRY NOT NULL SRID 4326
);
```

`SPATIAL` indexes can be created on spatial columns if they are `NOT NULL` and have a specific SRID, so if you plan to index the column, declare it with the `NOT NULL` and `SRID` attributes:

```sql
CREATE TABLE geom (g GEOMETRY NOT NULL SRID 4326);
```

`InnoDB` tables permit `SRID` values for Cartesian and geographic SRSs. `MyISAM` tables permit `SRID` values for Cartesian SRSs.

The `SRID` attribute makes a spatial column SRID-restricted, which has these implications:

- The column can contain only values with the given SRID. Attempts to insert values with a different SRID produce an error.
- The optimizer can use `SPATIAL` indexes on the column. See [Section 8.3.3, “SPATIAL Index Optimization”](https://dev.mysql.com/doc/refman/8.0/en/spatial-index-optimization.html).

Spatial columns with no `SRID` attribute are not SRID-restricted and accept values with any SRID. However, the optimizer cannot use `SPATIAL` indexes on them until the column definition is modified to include an `SRID` attribute, which may require that the column contents first be modified so that all values have the same SRID.

For other examples showing how to use spatial data types in MySQL, see [Section 11.4.6, “Creating Spatial Columns”](https://dev.mysql.com/doc/refman/8.0/en/creating-spatial-columns.html). For information about spatial reference systems, see [Section 11.4.5, “Spatial Reference System Support”](https://dev.mysql.com/doc/refman/8.0/en/spatial-reference-systems.html).

## 2.索引

### 2.1索引的数据结构

Understanding the B-tree and hash data structures can help predict how different queries perform on different storage engines that use these data structures in their indexes, particularly for the `MEMORY` storage engine that lets you choose B-tree or hash indexes.

- [B-Tree Index Characteristics](https://dev.mysql.com/doc/refman/8.0/en/index-btree-hash.html#btree-index-characteristics)
- [Hash Index Characteristics](https://dev.mysql.com/doc/refman/8.0/en/index-btree-hash.html#hash-index-characteristics)

#### B-Tree Index Characteristics



A B-tree index can be used for column comparisons in expressions that use the [`=`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_equal), [`>`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_greater-than), [`>=`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_greater-than-or-equal), [`<`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_less-than), [`<=`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_less-than-or-equal), or [`BETWEEN`](https://dev.mysql.com/doc/refman/8.0/en/comparison-operators.html#operator_between) operators. The index also can be used for [`LIKE`](https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like) comparisons if the argument to [`LIKE`](https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like) is a constant string that does not start with a wildcard character. For example, the following [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) statements use indexes:

```sql
SELECT * FROM tbl_name WHERE key_col LIKE 'Patrick%';
SELECT * FROM tbl_name WHERE key_col LIKE 'Pat%_ck%';
```

In the first statement, only rows with `'Patrick' <= *`key_col`* < 'Patricl'` are considered. In the second statement, only rows with `'Pat' <= *`key_col`* < 'Pau'` are considered.

The following [`SELECT`](https://dev.mysql.com/doc/refman/8.0/en/select.html) statements do not use indexes:

```sql
SELECT * FROM tbl_name WHERE key_col LIKE '%Patrick%';
SELECT * FROM tbl_name WHERE key_col LIKE other_col;
```

In the first statement, the [`LIKE`](https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like) value begins with a wildcard character. In the second statement, the [`LIKE`](https://dev.mysql.com/doc/refman/8.0/en/string-comparison-functions.html#operator_like) value is not a constant.

If you use `... LIKE '%*`string`*%'` and *`string`* is longer than three characters, MySQL uses the Turbo Boyer-Moore algorithm to initialize the pattern for the string and then uses this pattern to perform the search more quickly.



A search using `*`col_name`* IS NULL` employs indexes if *`col_name`* is indexed.

Any index that does not span all [`AND`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and) levels in the `WHERE` clause is not used to optimize the query. In other words, to be able to use an index, a prefix of the index must be used in every [`AND`](https://dev.mysql.com/doc/refman/8.0/en/logical-operators.html#operator_and) group.

The following `WHERE` clauses use indexes:

```sql
... WHERE index_part1=1 AND index_part2=2 AND other_column=3

    /* index = 1 OR index = 2 */
... WHERE index=1 OR A=10 AND index=2

    /* optimized like "index_part1='hello'" */
... WHERE index_part1='hello' AND index_part3=5

    /* Can use index on index1 but not on index2 or index3 */
... WHERE index1=1 AND index2=2 OR index1=3 AND index3=3;
```

These `WHERE` clauses do *not* use indexes:

```sql
    /* index_part1 is not used */
... WHERE index_part2=1 AND index_part3=2

    /*  Index is not used in both parts of the WHERE clause  */
... WHERE index=1 OR A=10

    /* No index spans all rows  */
... WHERE index_part1=1 OR index_part2=10
```

Sometimes MySQL does not use an index, even if one is available. One circumstance under which this occurs is when the optimizer estimates that using the index would require MySQL to access a very large percentage of the rows in the table. (In this case, a table scan is likely to be much faster because it requires fewer seeks.) However, if such a query uses `LIMIT` to retrieve only some of the rows, MySQL uses an index anyway, because it can much more quickly find the few rows to return in the result.

#### Hash Index Characteristics



Hash indexes have somewhat different characteristics from those just discussed:

- They are used only for equality comparisons that use the `=` or `<=>` operators (but are *very* fast). They are not used for comparison operators such as `<` that find a range of values. Systems that rely on this type of single-value lookup are known as “key-value stores”; to use MySQL for such applications, use hash indexes wherever possible.
- The optimizer cannot use a hash index to speed up `ORDER BY` operations. (This type of index cannot be used to search for the next entry in order.)
- MySQL cannot determine approximately how many rows there are between two values (this is used by the range optimizer to decide which index to use). This may affect some queries if you change a `MyISAM` or `InnoDB` table to a hash-indexed `MEMORY` table.
- Only whole keys can be used to search for a row. (With a B-tree index, any leftmost prefix of the key can be used to find rows.)

The following diagram shows in-memory and on-disk structures that comprise the `InnoDB` storage engine architecture. For information about each structure, see [Section 15.5, “InnoDB In-Memory Structures”](https://dev.mysql.com/doc/refman/8.0/en/innodb-in-memory-structures.html), and [Section 15.6, “InnoDB On-Disk Structures”](https://dev.mysql.com/doc/refman/8.0/en/innodb-on-disk-structures.html).



