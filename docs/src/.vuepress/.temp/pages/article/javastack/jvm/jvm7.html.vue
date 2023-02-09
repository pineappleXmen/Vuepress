<template><div><h1 id="chapter-7-backup-and-recovery" tabindex="-1"><a class="header-anchor" href="#chapter-7-backup-and-recovery" aria-hidden="true">#</a> Chapter 7 Backup and Recovery</h1>
<p>It is important to back up your databases so that you can recover your data and be up and running again</p>
<p>in case problems occur, such as system crashes, hardware failures, or users deleting data by mistake.</p>
<p>Backups are also essential as a safeguard before upgrading a MySQL installation, and they can be used to</p>
<p>transfer a MySQL installation to another system or to set up replica servers.</p>
<p>MySQL offers a variety of backup strategies from which you can choose the methods that best suit the</p>
<p>requirements for your installation. This chapter discusses several backup and recovery topics with which</p>
<p>you should be familiar:</p>
<blockquote>
<p>• Types of backups: Logical versus physical, full versus incremental, and so forth.</p>
<p>• Methods for creating backups.</p>
<p>• Recovery methods, including point-in-time recovery.</p>
<p>• Backup scheduling, compression, and encryption.</p>
<p>• Table maintenance, to enable recovery of corrupt tables.</p>
</blockquote>
<h2 id="_7-1-backup-and-recovery-types" tabindex="-1"><a class="header-anchor" href="#_7-1-backup-and-recovery-types" aria-hidden="true">#</a> 7.1 Backup and Recovery Types</h2>
<p>This section describes the characteristics of different types of backups.</p>
<h4 id="physical-raw-versus-logical-backups" tabindex="-1"><a class="header-anchor" href="#physical-raw-versus-logical-backups" aria-hidden="true">#</a> Physical (Raw) Versus Logical Backups</h4>
<p>Physical backups consist of raw copies of the directories and files that store database contents. This type</p>
<p>of backup is suitable for large, important databases that need to be recovered quickly when problems</p>
<p>occur.</p>
<p>Logical backups save information represented as logical database structure (CREATE DATABASE, CREATE</p>
<p>TABLE statements) and content (INSERT statements or delimited-text files). This type of backup is suitable</p>
<p>for smaller amounts of data where you might edit the data values or table structure, or recreate the data on</p>
<p>a different machine architecture.</p>
<p>Physical backup methods have these characteristics:</p>
<blockquote>
<p>• The backup consists of exact copies of database directories and files. Typically this is a copy of all or</p>
<p>part of the MySQL data directory.</p>
<p>• Physical backup methods are faster than logical because they involve only file copying without</p>
<p>conversion.</p>
<p>• Output is more compact than for logical backup.</p>
<p>• Because backup speed and compactness are important for busy, important databases, the MySQL</p>
<p>Enterprise Backup product performs physical backups. For an overview of the MySQL Enterprise</p>
<p>Backup product, see Section 30.2, “MySQL Enterprise Backup Overview”.</p>
<p>• Backup and restore granularity ranges from the level of the entire data directory down to the level of</p>
<p>individual files. This may or may not provide for table-level granularity, depending on storage engine. For</p>
<p>example, InnoDB tables can each be in a separate file, or share file storage with other InnoDB tables;</p>
<p>each MyISAM table corresponds uniquely to a set of files.</p>
<p>• In addition to databases, the backup can include any related files such as log or configuration files.</p>
<p>• Data from MEMORY tables is tricky to back up this way because their contents are not stored on disk.</p>
<p>(The MySQL Enterprise Backup product has a feature where you can retrieve data from MEMORY tables</p>
<p>during a backup.)</p>
<p>• Backups are portable only to other machines that have identical or similar hardware characteristics.</p>
<p>• Backups can be performed while the MySQL server is not running. If the server is running, it is</p>
<p>necessary to perform appropriate locking so that the server does not change database contents during</p>
<p>the backup. MySQL Enterprise Backup does this locking automatically for tables that require it.</p>
<p>• Physical backup tools include the mysqlbackup of MySQL Enterprise Backup for InnoDB or any other</p>
<p>tables, or file system-level commands (such as cp, scp, tar, rsync) for MyISAM tables.</p>
<p>• For restore:</p>
<p>• MySQL Enterprise Backup restores InnoDB and other tables that it backed up.</p>
<p>• ndb_restore restores NDB tables.</p>
<p>• Files copied at the file system level can be copied back to their original locations with file system</p>
<p>commands.</p>
</blockquote>
<p>Logical backup methods have these characteristics:</p>
<blockquote>
<p>• The backup is done by querying the MySQL server to obtain database structure and content information.</p>
<p>• Backup is slower than physical methods because the server must access database information and</p>
<p>convert it to logical format. If the output is written on the client side, the server must also send it to the</p>
<p>backup program.</p>
<p>• Output is larger than for physical backup, particularly when saved in text format.</p>
<p>• Backup and restore granularity is available at the server level (all databases), database level (all tables</p>
<p>in a particular database), or table level. This is true regardless of storage engine.</p>
<p>• The backup does not include log or configuration files, or other database-related files that are not part of</p>
<p>databases.</p>
<p>• Backups stored in logical format are machine independent and highly portable.</p>
<p>• Logical backups are performed with the MySQL server running. The server is not taken offline.</p>
<p>• Logical backup tools include the mysqldump program and the SELECT ... INTO OUTFILE</p>
<p>statement. These work for any storage engine, even MEMORY.</p>
<p>• To restore logical backups, SQL-format dump files can be processed using the mysql client.</p>
<p>To load delimited-text files, use the LOAD DATA statement or the mysqlimport client.</p>
</blockquote>
<h4 id="online-versus-offline-backups" tabindex="-1"><a class="header-anchor" href="#online-versus-offline-backups" aria-hidden="true">#</a> Online Versus Offline Backups</h4>
<p>Online backups take place while the MySQL server is running so that the database information can be</p>
<p>obtained from the server. Offline backups take place while the server is stopped. This distinction can also</p>
<p>be described as “hot” versus “cold” backups; a “warm” backup is one where the server remains running but</p>
<p>locked against modifying data while you access database files externally.</p>
<p>Online backup methods have these characteristics:</p>
<blockquote>
<p>• The backup is less intrusive to other clients, which can connect to the MySQL server during the backup</p>
<p>and may be able to access data depending on what operations they need to perform.</p>
<p>• Care must be taken to impose appropriate locking so that data modifications do not take place that</p>
<p>would compromise backup integrity. The MySQL Enterprise Backup product does such locking</p>
<p>automatically.</p>
</blockquote>
<p>Offline backup methods have these characteristics:</p>
<blockquote>
<p>• Clients can be affected adversely because the server is unavailable during backup. For that reason,</p>
<p>such backups are often taken from a replica that can be taken offline without harming availability.</p>
<p>• The backup procedure is simpler because there is no possibility of interference from client activity.</p>
<p>A similar distinction between online and offline applies for recovery operations, and similar characteristics</p>
<p>apply. However, it is more likely for clients to be affected by online recovery than by online backup because</p>
<p>recovery requires stronger locking. During backup, clients might be able to read data while it is being</p>
<p>backed up. Recovery modifies data and does not just read it, so clients must be prevented from accessing</p>
<p>data while it is being restored.</p>
</blockquote>
<h4 id="local-versus-remote-backups" tabindex="-1"><a class="header-anchor" href="#local-versus-remote-backups" aria-hidden="true">#</a> Local Versus Remote Backups</h4>
<p>A local backup is performed on the same host where the MySQL server runs, whereas a remote backup</p>
<p>is done from a different host. For some types of backups, the backup can be initiated from a remote host</p>
<p>even if the output is written locally on the server. host.</p>
<blockquote>
<p>• mysqldump can connect to local or remote servers. For SQL output (CREATE and INSERT statements),</p>
<p>local or remote dumps can be done and generate output on the client. For delimited-text output (with the</p>
<p>--tab option), data files are created on the server host.</p>
<p>• SELECT ... INTO OUTFILE can be initiated from a local or remote client host, but the output file is</p>
<p>created on the server host.</p>
<p>• Physical backup methods typically are initiated locally on the MySQL server host so that the server can</p>
<p>be taken offline, although the destination for copied files might be remote.</p>
</blockquote>
<h4 id="snapshot-backups" tabindex="-1"><a class="header-anchor" href="#snapshot-backups" aria-hidden="true">#</a> Snapshot Backups</h4>
<p>Some file system implementations enable “snapshots” to be taken. These provide logical copies of the file</p>
<p>system at a given point in time, without requiring a physical copy of the entire file system. (For example,</p>
<p>the implementation may use copy-on-write techniques so that only parts of the file system modified after</p>
<p>the snapshot time need be copied.) MySQL itself does not provide the capability for taking file system</p>
<p>snapshots. It is available through third-party solutions such as Veritas, LVM, or ZFS.</p>
<h4 id="full-versus-incremental-backups" tabindex="-1"><a class="header-anchor" href="#full-versus-incremental-backups" aria-hidden="true">#</a> Full Versus Incremental Backups</h4>
<p>A full backup includes all data managed by a MySQL server at a given point in time. An incremental</p>
<p>backup consists of the changes made to the data during a given time span (from one point in time to</p>
<p>another). MySQL has different ways to perform full backups, such as those described earlier in this section.</p>
<p>Incremental backups are made possible by enabling the server's binary log, which the server uses to</p>
<p>record data changes.</p>
<h4 id="full-versus-point-in-time-incremental-recovery" tabindex="-1"><a class="header-anchor" href="#full-versus-point-in-time-incremental-recovery" aria-hidden="true">#</a> Full Versus Point-in-Time (Incremental) Recovery</h4>
<p>A full recovery restores all data from a full backup. This restores the server instance to the state that it</p>
<p>had when the backup was made. If that state is not sufficiently current, a full recovery can be followed by</p>
<p>recovery of incremental backups made since the full backup, to bring the server to a more up-to-date state.</p>
<p>Incremental recovery is recovery of changes made during a given time span. This is also called point-in-</p>
<p>time recovery because it makes a server's state current up to a given time. Point-in-time recovery is based</p>
<p>on the binary log and typically follows a full recovery from the backup files that restores the server to its</p>
<p>state when the backup was made. Then the data changes written in the binary log files are applied as</p>
<p>incremental recovery to redo data modifications and bring the server up to the desired point in time.</p>
<h4 id="table-maintenance" tabindex="-1"><a class="header-anchor" href="#table-maintenance" aria-hidden="true">#</a> Table Maintenance</h4>
<p>Data integrity can be compromised if tables become corrupt. For InnoDB tables, this is not a typical issue.</p>
<p>For programs to check MyISAM tables and repair them if problems are found, see Section 7.6, “MyISAM</p>
<p>Table Maintenance and Crash Recovery”.</p>
<h4 id="backup-scheduling-compression-and-encryption" tabindex="-1"><a class="header-anchor" href="#backup-scheduling-compression-and-encryption" aria-hidden="true">#</a> Backup Scheduling, Compression, and Encryption</h4>
<p>Backup scheduling is valuable for automating backup procedures. Compression of backup output reduces</p>
<p>space requirements, and encryption of the output provides better security against unauthorized access of</p>
<p>backed-up data. MySQL itself does not provide these capabilities. The MySQL Enterprise Backup product</p>
<p>can compress InnoDB backups, and compression or encryption of backup output can be achieved using</p>
<p>file system utilities. Other third-party solutions may be available.</p>
<h2 id="_7-2-database-backup-methods" tabindex="-1"><a class="header-anchor" href="#_7-2-database-backup-methods" aria-hidden="true">#</a> 7.2 Database Backup Methods</h2>
<p>This section summarizes some general methods for making backups.</p>
<h4 id="making-a-hot-backup-with-mysql-enterprise-backup" tabindex="-1"><a class="header-anchor" href="#making-a-hot-backup-with-mysql-enterprise-backup" aria-hidden="true">#</a> Making a Hot Backup with MySQL Enterprise Backup</h4>
<p>Customers of MySQL Enterprise Edition can use the MySQL Enterprise Backup product to do physical</p>
<p>backups of entire instances or selected databases, tables, or both. This product includes features for</p>
<p>incremental and compressed backups. Backing up the physical database files makes restore much faster</p>
<p>than logical techniques such as the mysqldump command. InnoDB tables are copied using a hot backup</p>
<p>mechanism. (Ideally, the InnoDB tables should represent a substantial majority of the data.) Tables</p>
<p>from other storage engines are copied using a warm backup mechanism. For an overview of the MySQL</p>
<p>Enterprise Backup product, see Section 30.2, “MySQL Enterprise Backup Overview”.</p>
<h4 id="making-backups-with-mysqldump" tabindex="-1"><a class="header-anchor" href="#making-backups-with-mysqldump" aria-hidden="true">#</a> Making Backups with mysqldump</h4>
<p>The mysqldump program can make backups. It can back up all kinds of tables. (See Section 7.4, “Using</p>
<p>mysqldump for Backups”.)</p>
<p>For InnoDB tables, it is possible to perform an online backup that takes no locks on tables using the --</p>
<p>single-transaction option to mysqldump. See Section 7.3.1, “Establishing a Backup Policy”.</p>
<h4 id="making-backups-by-copying-table-files" tabindex="-1"><a class="header-anchor" href="#making-backups-by-copying-table-files" aria-hidden="true">#</a> Making Backups by Copying Table Files</h4>
<p>MyISAM tables can be backed up by copying table files (*.MYD, *.MYI files, and associated *.sdi files).</p>
<p>To get a consistent backup, stop the server or lock and flush the relevant tables:</p>
<p>FLUSH TABLES tbl_list WITH READ LOCK;</p>
<p>You need only a read lock; this enables other clients to continue to query the tables while you are making a</p>
<p>copy of the files in the database directory. The flush is needed to ensure that the all active index pages are</p>
<p>written to disk before you start the backup. See Section 13.3.6, “LOCK TABLES and UNLOCK TABLES</p>
<p>Statements”, and Section 13.7.8.3, “FLUSH Statement”.</p>
<p>You can also create a binary backup simply by copying the table files, as long as the server isn't updating</p>
<p>anything. (But note that table file copying methods do not work if your database contains InnoDB tables.</p>
<p>Also, even if the server is not actively updating data, InnoDB may still have modified data cached in</p>
<p>memory and not flushed to disk.)</p>
<p>For an example of this backup method, refer to the export and import example in Section 13.2.5, “IMPORT</p>
<p>TABLE Statement”.</p>
<h4 id="making-delimited-text-file-backups" tabindex="-1"><a class="header-anchor" href="#making-delimited-text-file-backups" aria-hidden="true">#</a> Making Delimited-Text File Backups</h4>
<p>To create a text file containing a table's data, you can use SELECT * INTO OUTFILE 'file_name'</p>
<p>FROM tbl_name. The file is created on the MySQL server host, not the client host. For this statement, the</p>
<p>output file cannot already exist because permitting files to be overwritten constitutes a security risk. See</p>
<p>Section 13.2.10, “SELECT Statement”. This method works for any kind of data file, but saves only table</p>
<p>data, not the table structure.</p>
<p>Another way to create text data files (along with files containing CREATE TABLE statements for the backed</p>
<p>up tables) is to use mysqldump with the --tab option. See Section 7.4.3, “Dumping Data in Delimited-</p>
<p>Text Format with mysqldump”.</p>
<p>To reload a delimited-text data file, use LOAD DATA or mysqlimport.</p>
<h4 id="making-incremental-backups-by-enabling-the-binary-log" tabindex="-1"><a class="header-anchor" href="#making-incremental-backups-by-enabling-the-binary-log" aria-hidden="true">#</a> Making Incremental Backups by Enabling the Binary Log</h4>
<p>MySQL supports incremental backups using the binary log. The binary log files provide you with the</p>
<p>information you need to replicate changes to the database that are made subsequent to the point at which</p>
<p>you performed a backup. Therefore, to allow a server to be restored to a point-in-time, binary logging must</p>
<p>be enabled on it, which is the default setting for MySQL 8.0 ; see Section 5.4.4, “The Binary Log”.</p>
<p>At the moment you want to make an incremental backup (containing all changes that happened since the</p>
<p>last full or incremental backup), you should rotate the binary log by using FLUSH LOGS. This done, you</p>
<p>need to copy to the backup location all binary logs which range from the one of the moment of the last full</p>
<p>or incremental backup to the last but one. These binary logs are the incremental backup; at restore time,</p>
<p>you apply them as explained in Section 7.5, “Point-in-Time (Incremental) Recovery”. The next time you do</p>
<p>a full backup, you should also rotate the binary log using FLUSH LOGS or mysqldump --flush-logs.</p>
<p>See Section 4.5.4, “mysqldump — A Database Backup Program”.</p>
<h4 id="making-backups-using-replicas" tabindex="-1"><a class="header-anchor" href="#making-backups-using-replicas" aria-hidden="true">#</a> Making Backups Using Replicas</h4>
<p>If you have performance problems with a server while making backups, one strategy that can help is to set</p>
<p>up replication and perform backups on the replica rather than on the source. See Section 17.4.1, “Using</p>
<p>Replication for Backups”.</p>
<p>If you are backing up a replica, you should back up its connection metadata repository and applier</p>
<p>metadata repository (see Section 17.2.4, “Relay Log and Replication Metadata Repositories”) when you</p>
<p>back up the replica's databases, regardless of the backup method you choose. This information is always</p>
<p>needed to resume replication after you restore the replica's data. If your replica is replicating LOAD DATA</p>
<p>statements, you should also back up any SQL_LOAD-* files that exist in the directory that the replica</p>
<p>uses for this purpose. The replica needs these files to resume replication of any interrupted operations.</p>
<p>The location of this directory is the value of the system variable replica_load_tmpdir (from MySQL 8.0.26)</p>
<p>or slave_load_tmpdir (before MySQL 8.0.26). If the server was not started with that</p>
<p>variable set, the directory location is the value of the tmpdir system variable.</p>
<h4 id="recovering-corrupt-tables" tabindex="-1"><a class="header-anchor" href="#recovering-corrupt-tables" aria-hidden="true">#</a> Recovering Corrupt Tables</h4>
<p>If you have to restore MyISAM tables that have become corrupt, try to recover them using REPAIR TABLE</p>
<p>or myisamchk -r first. That should work in 99.9% of all cases. If myisamchk fails, see Section 7.6,</p>
<p>“MyISAM Table Maintenance and Crash Recovery”.</p>
<h4 id="making-backups-using-a-file-system-snapshot" tabindex="-1"><a class="header-anchor" href="#making-backups-using-a-file-system-snapshot" aria-hidden="true">#</a> Making Backups Using a File System Snapshot</h4>
<p>If you are using a Veritas file system, you can make a backup like this:</p>
<blockquote>
<ol>
<li>
<p>From a client program, execute FLUSH TABLES WITH READ LOCK.</p>
</li>
<li>
<p>From another shell, execute mount vxfs snapshot.</p>
</li>
<li>
<p>From the first client, execute UNLOCK TABLES.</p>
</li>
<li>
<p>Copy files from the snapshot.</p>
</li>
<li>
<p>Unmount the snapshot.</p>
</li>
</ol>
</blockquote>
<h2 id="_7-3-example-backup-and-recovery-strategy" tabindex="-1"><a class="header-anchor" href="#_7-3-example-backup-and-recovery-strategy" aria-hidden="true">#</a> 7.3 Example Backup and Recovery Strategy</h2>
<p>This section discusses a procedure for performing backups that enables you to recover data after several
types of crashes:</p>
<h5 id="•-operating-system-crash" tabindex="-1"><a class="header-anchor" href="#•-operating-system-crash" aria-hidden="true">#</a> • Operating system crash</h5>
<h5 id="•-power-failure" tabindex="-1"><a class="header-anchor" href="#•-power-failure" aria-hidden="true">#</a> • Power failure</h5>
<h5 id="•-file-system-crash" tabindex="-1"><a class="header-anchor" href="#•-file-system-crash" aria-hidden="true">#</a> • File system crash</h5>
<h5 id="•-hardware-problem-hard-drive-motherboard-and-so-forth" tabindex="-1"><a class="header-anchor" href="#•-hardware-problem-hard-drive-motherboard-and-so-forth" aria-hidden="true">#</a> • Hardware problem (hard drive, motherboard, and so forth)</h5>
<p>The example commands do not include options such as --user and --password for the mysqldump
and mysql client programs. You should include such options as necessary to enable client programs to
connect to the MySQL server.
Assume that data is stored in the InnoDB storage engine, which has support for transactions and
automatic crash recovery. Assume also that the MySQL server is under load at the time of the crash. If it
were not, no recovery would ever be needed.
For cases of operating system crashes or power failures, we can assume that MySQL's disk data is
available after a restart. The InnoDB data files might not contain consistent data due to the crash, but
InnoDB reads its logs and finds in them the list of pending committed and noncommitted transactions that
have not been flushed to the data files. InnoDB automatically rolls back those transactions that were not
committed, and flushes to its data files those that were committed. Information about this recovery process
is conveyed to the user through the MySQL error log.</p>
<p>For the cases of file system crashes or hardware problems, we can assume that the MySQL disk data is
not available after a restart. This means that MySQL fails to start successfully because some blocks of
disk data are no longer readable. In this case, it is necessary to reformat the disk, install a new one, or
otherwise correct the underlying problem. Then it is necessary to recover our MySQL data from backups,
which means that backups must already have been made. To make sure that is the case, design and
implement a backup policy</p>
<h3 id="_7-3-1-establishing-a-backup-policy" tabindex="-1"><a class="header-anchor" href="#_7-3-1-establishing-a-backup-policy" aria-hidden="true">#</a> 7.3.1 Establishing a Backup Policy</h3>
<p>To be useful, backups must be scheduled regularly. A full backup (a snapshot of the data at a point in time)
can be done in MySQL with several tools. For example, MySQL Enterprise Backup can perform a physical
backup of an entire instance, with optimizations to minimize overhead and avoid disruption when backing
up InnoDB data files; mysqldump provides online logical backup. This discussion uses mysqldump.
Assume that we make a full backup of all our InnoDB tables in all databases using the following command
on Sunday at 1 p.m., when load is low:
$&gt; mysqldump --all-databases --master-data --single-transaction &gt; backup_sunday_1_PM.sql
The resulting .sql file produced by mysqldump contains a set of SQL INSERT statements that can be
used to reload the dumped tables at a later time.
This backup operation acquires a global read lock on all tables at the beginning of the dump (using FLUSH
TABLES WITH READ LOCK). As soon as this lock has been acquired, the binary log coordinates are read
and the lock is released. If long updating statements are running when the FLUSH statement is issued, the
backup operation may stall until those statements finish. After that, the dump becomes lock-free and does
not disturb reads and writes on the tables.
It was assumed earlier that the tables to back up are InnoDB tables, so --single-transaction uses
a consistent read and guarantees that data seen by mysqldump does not change. (Changes made by
other clients to InnoDB tables are not seen by the mysqldump process.) If the backup operation includes
nontransactional tables, consistency requires that they do not change during the backup. For example, for
the MyISAM tables in the mysql database, there must be no administrative changes to MySQL accounts
during the backup.
less time to produce. The tradeoff is that, at recovery time, you cannot restore your data just by reloading
the full backup. You must also process the incremental backups to recover the incremental changes.
To make incremental backups, we need to save the incremental changes. In MySQL, these changes
are represented in the binary log, so the MySQL server should always be started with the --log-bin
option to enable that log. With binary logging enabled, the server writes each data change into a file while
it updates data. Looking at the data directory of a MySQL server that has been running for some days, we
find these MySQL binary log files:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>-rw-rw---- <span class="token number">1</span> guilhem guilhem <span class="token number">1277324</span> Nov <span class="token number">10</span> <span class="token number">23</span>:59 gbichot2-bin.000001
-rw-rw---- <span class="token number">1</span> guilhem guilhem <span class="token number">4</span> Nov <span class="token number">10</span> <span class="token number">23</span>:59 gbichot2-bin.000002
-rw-rw---- <span class="token number">1</span> guilhem guilhem <span class="token number">79</span> Nov <span class="token number">11</span> <span class="token number">11</span>:06 gbichot2-bin.000003
-rw-rw---- <span class="token number">1</span> guilhem guilhem <span class="token number">508</span> Nov <span class="token number">11</span> <span class="token number">11</span>:08 gbichot2-bin.000004
-rw-rw---- <span class="token number">1</span> guilhem guilhem <span class="token number">220047446</span> Nov <span class="token number">12</span> <span class="token number">16</span>:47 gbichot2-bin.000005
-rw-rw---- <span class="token number">1</span> guilhem guilhem <span class="token number">998412</span> Nov <span class="token number">14</span> <span class="token number">10</span>:08 gbichot2-bin.000006
-rw-rw---- <span class="token number">1</span> guilhem guilhem <span class="token number">361</span> Nov <span class="token number">14</span> <span class="token number">10</span>:07 gbichot2-bin.index
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Each time it restarts, the MySQL server creates a new binary log file using the next number in the
sequence. While the server is running, you can also tell it to close the current binary log file and begin
a new one manually by issuing a FLUSH LOGS SQL statement or with a mysqladmin flush-logs
command. mysqldump also has an option to flush the logs. The .index file in the data directory contains
the list of all MySQL binary logs in the directory.
The MySQL binary logs are important for recovery because they form the set of incremental backups. If
you make sure to flush the logs when you make your full backup, the binary log files created afterward
contain all the data changes made since the backup. Let's modify the previous mysqldump command a
bit so that it flushes the MySQL binary logs at the moment of the full backup, and so that the dump file
contains the name of the new current binary log:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$<span class="token operator">></span> mysqldump --single-transaction --flush-logs --master-data<span class="token operator">=</span><span class="token number">2</span> <span class="token punctuation">\</span>
--all-databases <span class="token operator">></span> backup_sunday_1_PM.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>After executing this command, the data directory contains a new binary log file, gbichot2-bin.000007,
because the --flush-logs option causes the server to flush its logs. The --master-data option
causes mysqldump to write binary log information to its output, so the resulting .sql dump file includes
these lines:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>-- Position to start replication or point-in-time recovery from
-- CHANGE MASTER TO <span class="token assign-left variable">MASTER_LOG_FILE</span><span class="token operator">=</span><span class="token string">'gbichot2-bin.000007'</span>,MASTER_LOG_POS<span class="token operator">=</span><span class="token number">4</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>Because the mysqldump command made a full backup, those lines mean two things:
<strong>• The dump file contains all changes made before any changes written to the gbichot2-bin.000007</strong>
<strong>binary log file or higher.</strong>
<strong>• All data changes logged after the backup are not present in the dump file, but are present in the</strong>
<strong>gbichot2-bin.000007 binary log file or higher.</strong>
On Monday at 1 p.m., we can create an incremental backup by flushing the logs to begin a new binary log
file. For example, executing a mysqladmin flush-logs command creates gbichot2-bin.000008.
All changes between the Sunday 1 p.m. full backup and Monday 1 p.m. are written in gbichot2-
bin.000007. This incremental backup is important, so it is a good idea to copy it to a safe place. (For
example, back it up on tape or DVD, or copy it to another machine.) On Tuesday at 1 p.m., execute
another mysqladmin flush-logs command. All changes between Monday 1 p.m. and Tuesday 1 p.m.
are written in gbichot2-bin.000008 (which also should be copied somewhere safe).
The MySQL binary logs take up disk space. To free up space, purge them from time to time. One way to
do this is by deleting the binary logs that are no longer needed, such as when we make a full backup:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$<span class="token operator">></span> mysqldump --single-transaction --flush-logs --master-data<span class="token operator">=</span><span class="token number">2</span> <span class="token punctuation">\</span>
--all-databases --delete-master-logs <span class="token operator">></span> backup_sunday_1_PM.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_7-3-2-using-backups-for-recovery" tabindex="-1"><a class="header-anchor" href="#_7-3-2-using-backups-for-recovery" aria-hidden="true">#</a> 7.3.2 Using Backups for Recovery</h3>
<p>Now, suppose that we have a catastrophic unexpected exit on Wednesday at 8 a.m. that requires recovery
from backups. To recover, first we restore the last full backup we have (the one from Sunday 1 p.m.). The
full backup file is just a set of SQL statements, so restoring it is very easy:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$<span class="token operator">></span> mysql <span class="token operator">&lt;</span> backup_sunday_1_PM.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>At this point, the data is restored to its state as of Sunday 1 p.m.. To restore the changes made since then,
we must use the incremental backups; that is, the gbichot2-bin.000007 and gbichot2-bin.000008
binary log files. Fetch the files if necessary from where they were backed up, and then process their
contents like this:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$<span class="token operator">></span> mysqlbinlog gbichot2-bin.000007 gbichot2-bin.000008 <span class="token operator">|</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>We now have recovered the data to its state as of Tuesday 1 p.m., but still are missing the changes from
that date to the date of the crash. To not lose them, we would have needed to have the MySQL server
store its MySQL binary logs into a safe location (RAID disks, SAN, ...) different from the place where it
stores its data files, so that these logs were not on the destroyed disk. (That is, we can start the server with
a --log-bin option that specifies a location on a different physical device from the one on which the data
directory resides. That way, the logs are safe even if the device containing the directory is lost.) If we had
done this, we would have the gbichot2-bin.000009 file (and any subsequent files) at hand, and we
could apply them using mysqlbinlog and mysql to restore the most recent data changes with no loss up
to the moment of the crash:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$<span class="token operator">></span> mysqlbinlog gbichot2-bin.000009 <span class="token punctuation">..</span>. <span class="token operator">|</span> mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>For more information about using mysqlbinlog to process binary log files, see Section 7.5, “Point-in-
Time (Incremental) Recovery”.</p>
<h3 id="_7-3-3-backup-strategy-summary" tabindex="-1"><a class="header-anchor" href="#_7-3-3-backup-strategy-summary" aria-hidden="true">#</a> 7.3.3 Backup Strategy Summary</h3>
<p>In case of an operating system crash or power failure, InnoDB itself does all the job of recovering data. But
to make sure that you can sleep well, observe the following guidelines:
• Always tun the MySQL server with binary logging enabled (that is the default setting for MySQL 8.0). If
you have such safe media, this technique can also be good for disk load balancing (which results in a
performance improvement).
• Make periodic full backups, using the mysqldump command shown earlier in Section 7.3.1,
“Establishing a Backup Policy”, that makes an online, nonblocking backup.
• Make periodic incremental backups by flushing the logs with FLUSH LOGS or mysqladmin flush-
logs</p>
<h2 id="_7-4-using-mysqldump-for-backups" tabindex="-1"><a class="header-anchor" href="#_7-4-using-mysqldump-for-backups" aria-hidden="true">#</a> 7.4 Using mysqldump for Backups</h2>
<p>This section describes how to use mysqldump to produce dump files, and how to reload dump files. A
dump file can be used in several ways:
• As a backup to enable data recovery in case of data loss.
• As a source of data for setting up replicas.
• As a source of data for experimentation:
• To make a copy of a database that you can use without changing the original data.
• To test potential upgrade incompatibilities.
mysqldump produces two types of output, depending on whether the --tab option is given:
• Without --tab, mysqldump writes SQL statements to the standard output. This output consists of
CREATE statements to create dumped objects (databases, tables, stored routines, and so forth), and
INSERT statements to load data into tables. The output can be saved in a file and reloaded later
using mysql to recreate the dumped objects. Options are available to modify the format of the SQL
statements, and to control which objects are dumped.
• With --tab, mysqldump produces two output files for each dumped table. The server writes one file
as tab-delimited text, one line per table row. This file is named tbl_name.txt in the output directory.
The server also sends a CREATE TABLE statement for the table to mysqldump, which writes it as a file
named tbl_name.sql in the output directory.</p>
<h3 id="_7-4-1-dumping-data-in-sql-format-with-mysqldump" tabindex="-1"><a class="header-anchor" href="#_7-4-1-dumping-data-in-sql-format-with-mysqldump" aria-hidden="true">#</a> 7.4.1 Dumping Data in SQL Format with mysqldump</h3>
<p>This section describes how to use mysqldump to create SQL-format dump files. For information about
reloading such dump files, see Section 7.4.2, “Reloading SQL-Format Backups”.
By default, mysqldump writes information as SQL statements to the standard output. You can save the
output in a file:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$<span class="token operator">></span> mysqldump <span class="token punctuation">[</span>arguments<span class="token punctuation">]</span> <span class="token operator">></span> file_name
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>To dump all databases, invoke mysqldump with the --all-databases option:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$<span class="token operator">></span> mysqldump --all-databases <span class="token operator">></span> dump.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>To dump only specific databases, name them on the command line and use the --databases option:</p>
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code>$<span class="token operator">></span> mysqldump <span class="token parameter variable">--databases</span> db1 db2 db3 <span class="token operator">></span> dump.sql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>The --databases option causes all names on the command line to be treated as database names.
Without this option, mysqldump treats the first name as a database name and those following as table
names.</p>
</div></template>


